import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IService } from 'src/interfaces/service.interface';
import { DeleteResult, Repository } from 'typeorm';
import { DocumentEntity } from './entities/document.entity';

@Injectable()
export class DocumentsService implements IService<DocumentEntity> {
  constructor(
    @InjectRepository(DocumentEntity)
    private readonly _documentRepository: Repository<DocumentEntity>,
  ) {}

  public async fetchBulk<V>(queryParam?: V): Promise<DocumentEntity[]> {
    return await this._documentRepository
      .find(queryParam)
      .catch((error) => error);
  }

  public async fetch<V>(queryParam: V): Promise<DocumentEntity> {
    return await this._documentRepository
      .findOne(queryParam)
      .catch((error) => error);
  }

  public async create<K>(data: K): Promise<DocumentEntity> {
    return await this._documentRepository.save(data).catch((error) => error);
  }

  public async update<K, V>(queryParam: V, data: K): Promise<DocumentEntity> {
    return await this._documentRepository
      .update(queryParam, data)
      .catch((error) => error);
  }

  public async delete<V>(queryParam: V): Promise<boolean> {
    const deleteResult: DeleteResult = await this._documentRepository
      .delete(queryParam)
      .catch((error) => error);

    return deleteResult.affected > 0 ? true : false;
  }
}
