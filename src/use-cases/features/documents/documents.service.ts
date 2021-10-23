import { Injectable } from '@nestjs/common';
import { IService } from 'src/interfaces/service.interface';
import { DocumentEntity } from './entity/document.entity';

@Injectable()
export class DocumentsService implements IService<DocumentEntity> {
  constructor() {}

  public fetchBulk(): Promise<DocumentEntity[]> {
    throw new Error('Method not implemented.');
  }

  public fetch<V>(queryParam: V): Promise<DocumentEntity> {
    throw new Error('Method not implemented.');
  }

  public create<K>(data: K): Promise<DocumentEntity> {
    throw new Error('Method not implemented.');
  }

  public update<K, V>(queryParam: V, data: K): Promise<DocumentEntity> {
    throw new Error('Method not implemented.');
  }

  public delete<V>(queryParam: V): Promise<DocumentEntity> {
    throw new Error('Method not implemented.');
  }
}
