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
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ExceptionsHandler } from 'src/helpers/handlers/exceptions.handler';
import { DocumentsService } from './documents.service';
import { CreateDocumentDTO } from './dtos/create-document.dto';
import { DeleteDocumentDTO } from './dtos/delete-document.dto';
import { FetchDocumentsDTO } from './dtos/fetch-documents.dto';
import { UpdateDocumenDTO } from './dtos/update-document.dto';
import { Document } from './types/document.type';

@Controller('documents')
export class DocumentsController {
  constructor(
    private readonly _documentsService: DocumentsService,
    private readonly _jwtService: JwtService,
  ) {}

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
          users: doc.users,
        });
      }
    }

    return docsAvailable;
  }

  @Get(':documentId')
  public fetchDocument(
    @Param('documentId') fetchDocumentDTO,
  ): Promise<Document> {
    const doc = this._documentsService
      .fetch(fetchDocumentDTO.documentId)
      .catch((error) => {
        throw ExceptionsHandler(HttpStatus.INTERNAL_SERVER_ERROR);
      });

    if (typeof doc === 'undefined') {
      throw ExceptionsHandler(HttpStatus.NOT_FOUND);
    }

    return doc;
  }

  @Post('')
  public async createDocument(
    @Body() createDocumentDTO: CreateDocumentDTO,
  ): Promise<Document> {
    const { name, extension, users, blob, creator } = createDocumentDTO;

    const newDocument = {
      name: name,
      extension: extension,
      users: users,
      creator: creator,
      blob: blob,
    };

    const createdDocument = await this._documentsService
      .create(newDocument)
      .catch((error) => {
        throw ExceptionsHandler(HttpStatus.INTERNAL_SERVER_ERROR);
      });

    return createdDocument;
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
