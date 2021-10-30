import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IService } from 'src/interfaces/service.interface';
import { Repository } from 'typeorm';
import { DocumentsController } from './documents.controller';
import { DocumentEntity } from './entity/document.entity';

@Injectable()
export class DocumentsService implements IService<DocumentEntity> {
  constructor(
    @InjectRepository(DocumentEntity)
    private readonly _documentRepository: Repository<DocumentEntity>,
  ) {}

  public fetchBulk(): Promise<DocumentEntity[]> {
    throw new Error('Method not implemented.');
  }

  public fetch<V>(queryParam: V): Promise<DocumentEntity> {
    throw new Error('Method not implemented.');
  }

  public async create<K>(data: K): Promise<DocumentEntity> {
    return await this._documentRepository.save(data).catch((error) => error);
  }

  public update<K, V>(queryParam: V, data: K): Promise<DocumentEntity> {
    throw new Error('Method not implemented.');
  }

  public delete<V>(queryParam: V): Promise<DocumentEntity> {
    throw new Error('Method not implemented.');
  }
}
