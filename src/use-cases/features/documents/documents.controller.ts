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
  Put,
} from '@nestjs/common';
import { CreateDocumentDTO } from './dtos/create-document.dto';
import { DeleteDocumentDTO } from './dtos/delete-document.dto';
import { Document } from './types/document.type';
import { DocumentsService } from './documents.service';
import { ExceptionsHandler } from 'src/helpers/handlers/exceptions.handler';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationService } from '../users/features/authentication/authentication.service';

@Controller('documents')
export class DocumentsController {
  constructor(
    private readonly _documentsService: DocumentsService,
    private readonly _authenticationService: AuthenticationService,
    private readonly _jwtService: JwtService,
  ) {}

  @Get('')
  public async fetchDocuments(
    @Request() request,
  ): Promise<Array<Omit<Document, 'blob'>>> {
    const token: string = request.headers.authorization;

    const splitedToken = token.split(' ');

    const decodedToken = this._jwtService.decode(splitedToken[1]);

    const userId = decodedToken.sub;

    const docs = await this._documentsService.fetchBulk().catch((error) => {
      throw ExceptionsHandler(HttpStatus.INTERNAL_SERVER_ERROR);
    });

    const docsAvailable = [];

    for (const doc of docs) {
      console.log(doc);
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
  public async fetchDocument(
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
    // const usersToAdd = [];

    // for (const user of users) {
    //   const searchedUser = await this._authenticationService
    //     .fetch({ userId: user })
    //     .catch((error) => {
    //       throw ExceptionsHandler(HttpStatus.INTERNAL_SERVER_ERROR);
    //     });

    //   usersToAdd.push(searchedUser);
    // }

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
        console.log(error);
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
