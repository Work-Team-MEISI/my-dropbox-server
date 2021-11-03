import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Query,
  Param,
  Request,
} from '@nestjs/common';
import { CreateDocumentDTO } from './dtos/create-document.dto';
import { DeleteDocumentDTO } from './dtos/delete-document.dto';
import { FetchDocumentsDTO } from './dtos/fetch-documents.dto';
import { Document } from './types/document.type';
import { DocumentsService } from './documents.service';
import { ExceptionsHandler } from 'src/helpers/handlers/exceptions.handler';
import { JwtService } from '@nestjs/jwt';

@Controller('documents')
export class DocumentsController {
  constructor(
    private readonly _documentsService: DocumentsService,
    private readonly _jwtService: JwtService,
  ) {}

  @Get('')
  public async fetchDocuments(@Request() request): Promise<Array<Document>> {
    const token: string = request.headers.authorization;

    const splitedToken = token.split(' ');

    const decodedToken = this._jwtService.decode(splitedToken[1]);

    const userId = decodedToken.sub;

    const docs = await this._documentsService
      .fetchBulk(userId)
      .catch((error) => {
        throw ExceptionsHandler(HttpStatus.INTERNAL_SERVER_ERROR);
      });

    return docs;
  }

  @Get(':id')
  public async fetchDocument(@Param() params): Promise<Document> {
    return await this._documentsService.fetch(params.id).catch((error) => {
      throw ExceptionsHandler(HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  @Post('')
  public async createDocument(
    @Body() createDocumentDTO: CreateDocumentDTO,
  ): Promise<Document> {
    const { name, extension, users, blob } = createDocumentDTO;

    const newDocument = {
      name: name,
      extension: extension,
      users: users,
      blob: blob,
    };

    const createdDocument = await this._documentsService
      .create(newDocument)
      .catch((error) => {
        throw ExceptionsHandler(HttpStatus.INTERNAL_SERVER_ERROR);
      });

    return createdDocument;
  }

  @Delete('')
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
