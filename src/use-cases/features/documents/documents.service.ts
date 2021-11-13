import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IService } from 'src/interfaces/service.interface';
import { DeleteResult, In, Repository } from 'typeorm';
import { DocumentEntity } from './entities/document.entity';

@Injectable()
export class DocumentsService implements IService<DocumentEntity> {
  constructor(
    @InjectRepository(DocumentEntity)
    private readonly _documentRepository: Repository<DocumentEntity>,
  ) {}

  public async fetchBulk<K>(queryParam?: K): Promise<DocumentEntity[]> {
    return await this._documentRepository.find().catch((error) => error);
  }

  public async fetch<K>(queryParam?: K): Promise<DocumentEntity> {
    return await this._documentRepository
      .find(queryParam)
      .catch((error) => error);
  }

  public async create<K, P>(queryParam?: K, body?: P): Promise<DocumentEntity> {
    return await this._documentRepository
      .save(queryParam, body)
      .catch((error) => error);
  }

  public async update<K, P>(queryParam?: K, body?: P): Promise<DocumentEntity> {
    await this._documentRepository
      .update(queryParam, body)
      .catch((error) => error);

    return await this._documentRepository
      .findOne(queryParam)
      .catch((error) => error);
  }

  public async delete<K>(queryParam?: K): Promise<boolean> {
    const deleteResult: DeleteResult = await this._documentRepository
      .delete(queryParam)
      .catch((error) => error);

    return deleteResult.affected > 0 ? true : false;
  }

  public deleteBulk<K>(queryParam?: K): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
