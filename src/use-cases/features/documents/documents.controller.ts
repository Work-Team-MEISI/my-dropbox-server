import {
  Body,
  Controller,
  Delete,
  Get,
  Request,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  StreamableFile,
  Response,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { ExceptionsHandler } from 'src/helpers/handlers/exceptions.handler';
import { DocumentsService } from './documents.service';
import { DeleteDocumentDTO } from './dtos/delete-document.dto';
import { UpdateDocumenDTO } from './dtos/update-document.dto';
import { Document } from './types/document.type';

@Controller('documents')
export class DocumentsController {
  constructor(
    private readonly _documentsService: DocumentsService,
    private readonly _jwtService: JwtService,
  ) {}

  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  public async createDocument(
    @UploadedFile() file: Express.Multer.File,
    @Request() request,
  ): Promise<Document> {
    const entension = file.mimetype.split('/');

    const token: string = request.headers.authorization;

    const decodedToken = this._jwtService.decode(token.split(' ')[1]);

    const userId = decodedToken.sub;

    const newDocument = {
      name: file.originalname,
      extension: entension[1],
      users: [userId],
      creator: userId,
      blob: file,
    };

    const createdDocument = await this._documentsService
      .create(newDocument)
      .catch((error) => {
        throw ExceptionsHandler(HttpStatus.INTERNAL_SERVER_ERROR);
      });

    return createdDocument;
  }

  @Get('')
  public async fetchDocuments(@Request() request): Promise<Array<Document>> {
    const token: string = request.headers.authorization;

    const decodedToken = this._jwtService.decode(token.split(' ')[1]);

    const userId = decodedToken.sub;

    const documents = await this._documentsService
      .fetchBulk()
      .catch((error) => {
        throw ExceptionsHandler(HttpStatus.INTERNAL_SERVER_ERROR);
      });

    const docsAvailable = [];

    for (const doc of documents) {
      const userEquals = doc.users.findIndex((user) => user === userId);

      if (userEquals !== -1) {
        docsAvailable.push({
          documentId: doc.documentId,
          name: doc.name,
          extension: doc.extension,
          createdAt: doc.createdAt,
          creator: doc.creator,
          blob: doc.blob,
          users: doc.users,
        });
      }
    }

    return docsAvailable;
  }

  @Get(':documentId')
  public async fetchDocument(
    @Param('documentId') fetchDocumentDTO,
    @Response({ passthrough: true }) res,
  ): Promise<any> {
    console.log(fetchDocumentDTO);
    const doc = await this._documentsService
      .fetch({ documentId: fetchDocumentDTO })
      .catch((error) => {
        throw ExceptionsHandler(HttpStatus.INTERNAL_SERVER_ERROR);
      });

    if (typeof doc === 'undefined') {
      throw ExceptionsHandler(HttpStatus.NOT_FOUND);
    }

    const file = createReadStream(join(process.cwd(), doc.blob.path));

    res.set('Content-Type', doc.blob.mimetype);
    res.set('Content-Disposition', `attachment; filename=${doc.name}`);

    return new StreamableFile(file);
  }

  @Put(':documentId')
  public async updateDocument(
    @Param('documentId') documentId: string,
    @Body() updateDocumentDTO: UpdateDocumenDTO,
  ): Promise<Document> {
    const query = { documentId: documentId };

    const document = await this._documentsService
      .update(query, updateDocumentDTO)
      .catch((error) => {
        throw ExceptionsHandler(HttpStatus.INTERNAL_SERVER_ERROR);
      });

    return document;
  }

  @Delete()
  public async deleteDocument(
    @Query() deleteDocumentDTO: DeleteDocumentDTO,
  ): Promise<boolean> {
    const doc = this._documentsService
      .fetch(deleteDocumentDTO)
      .catch((error) => {
        throw ExceptionsHandler(HttpStatus.INTERNAL_SERVER_ERROR);
      });

    if (typeof doc === 'undefined') {
      throw ExceptionsHandler(HttpStatus.NOT_FOUND);
    }

    return await this._documentsService
      .delete(deleteDocumentDTO)
      .catch((error) => {
        throw ExceptionsHandler(HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
}
