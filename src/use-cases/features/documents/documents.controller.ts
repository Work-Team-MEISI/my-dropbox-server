import { Body, Controller, Delete, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { CreateDocumentDTO } from './dtos/create-document.dto';
import { DeleteDocumentDTO } from './dtos/delete-document.dto';
import { FetchDocumentDTO } from './dtos/fetch-document.dto';
import { FetchDocumentsDTO } from './dtos/fetch-documents.dto';
import { Document } from './types/document.type';
import { DocumentsService } from './documents.service'
import { ExceptionsHandler } from 'src/helpers/handlers/exceptions.handler';

@Controller('documents')
export class DocumentsController {
  constructor(
    private readonly _documentsService: DocumentsService
  ) {}

  @Get("")
  public fetchDocuments(
    @Query() fetchDocumentsDTO: FetchDocumentsDTO,
  ): Array<Document> {
    throw '';
  }

  @Get("")
  public fetchDocument(@Query() fetchDocumentDTO: FetchDocumentDTO): Document {
    throw '';
  }

  @Post("create")
  public async createDocument(
    @Body() createDocumentDTO: CreateDocumentDTO,
  ): Promise<Document> {
    const { name, extension, users, blob } = createDocumentDTO;

    const newDocument = {
      name: name,
      extension: extension,
      users: users,
      blob: blob
    };

    const createdDocument = await this._documentsService
      .create(newDocument)
      .catch((error) => {
        throw ExceptionsHandler(HttpStatus.INTERNAL_SERVER_ERROR);
      });

    return createdDocument;
  }

  @Delete("")
  public deleteDocument(
    @Query() deleteDocumentDTO: DeleteDocumentDTO,
  ): boolean {
    throw '';
  }
}
