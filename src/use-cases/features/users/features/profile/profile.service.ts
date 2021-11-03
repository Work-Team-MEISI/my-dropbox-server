import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IService } from 'src/interfaces/service.interface';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class ProfileService implements IService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
  ) {}

  fetchBulk<V>(queryParam?: V): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }

  public async fetch<V>(queryParam: V): Promise<UserEntity> {
    return this._userRepository.findOne(queryParam).catch((error) => error);
  }

  create<K>(data: K): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }

  update<K, V>(queryParam: V, data: K): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }

  delete<V>(queryParam: V): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
