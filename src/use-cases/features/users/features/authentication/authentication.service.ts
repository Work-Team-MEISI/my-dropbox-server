import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IService } from 'src/interfaces/service.interface';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class AuthenticationService implements IService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
  ) {}

  public async fetchBulk<K>(queryParam?: K): Promise<UserEntity[]> {
    return await this._userRepository.find(queryParam).catch((error) => error);
  }

  public async fetch<K>(queryParam?: K): Promise<UserEntity> {
    return await this._userRepository
      .findOne(queryParam)
      .catch((error) => error);
  }

  public async create<K, P>(queryParam?: K, body?: P): Promise<UserEntity> {
    return await this._userRepository
      .save(queryParam, body)
      .catch((error) => error);
  }

  public async update<K, P>(queryParam?: K, body?: P): Promise<UserEntity> {
    return await this._userRepository
      .save(queryParam, body)
      .catch((error) => error);
  }

  public delete<K>(queryParam?: K): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  public deleteBulk<K>(queryParam?: K): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
