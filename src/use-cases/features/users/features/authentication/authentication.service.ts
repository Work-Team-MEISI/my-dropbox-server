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

  public fetchBulk(): Promise<Array<UserEntity>> {
    throw new Error('Method not implemented.');
  }

  public async fetch<V>(queryParam: V): Promise<UserEntity> {
    return this._userRepository.findOne(queryParam).catch((error) => error);
  }

  public async create<K>(data: K): Promise<UserEntity> {
    return await this._userRepository.save(data).catch((error) => error);
  }

  public async update<K, V>(queryParam: V, data: K): Promise<UserEntity> {
    return await this._userRepository
      .save(queryParam, data)
      .catch((error) => error);
  }

  public delete<V>(queryParam: V): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }
}
