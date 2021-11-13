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

  public fetchBulk<K>(queryParam?: K): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }

  public fetch<K>(queryParam?: K): Promise<UserEntity> {
    return this._userRepository.findOne(queryParam).catch((error) => error);
  }

  public create<K, P>(queryParam?: K, body?: P): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }

  public update<K, P>(queryParam?: K, body?: P): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }

  public delete<K>(queryParam?: K): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  public deleteBulk<K>(queryParam?: K): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
