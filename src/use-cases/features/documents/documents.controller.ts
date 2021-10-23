import { Body, Controller, Query } from '@nestjs/common';
import { CreateDocumentDTO } from './dtos/create-document.dto';
import { DeleteDocumentDTO } from './dtos/delete-document.dto';
import { FetchDocumentDTO } from './dtos/fetch-document.dto';
import { FetchDocumentsDTO } from './dtos/fetch-documents.dto';
import { Document } from './types/document.type';

@Controller('documents')
export class DocumentsController {
  constructor() {}

  public fetchDocuments(
    @Query() fetchDocumentsDTO: FetchDocumentsDTO,
  ): Array<Document> {
    throw '';
  }

  public fetchDocument(@Query() fetchDocumentDTO: FetchDocumentDTO): Document {
    throw '';
  }

  public createDocument(
    @Body() createDocumentDTO: CreateDocumentDTO,
  ): Document {
    throw '';
  }

  public deleteDocument(
    @Query() deleteDocumentDTO: DeleteDocumentDTO,
  ): boolean {
    throw '';
  }
}
