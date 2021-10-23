import {
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { User } from '../../users/types/user.type';

@Entity('documents')
export class DocumentEntity {
  @PrimaryGeneratedColumn()
  public documentId;

  @PrimaryColumn('text')
  public name;

  @PrimaryColumn('date')
  public createdAt;

  @PrimaryColumn('text')
  public extension;

  @PrimaryColumn('blob')
  public blob;

  @OneToMany((type) => UserEntity, (userEntity) => userEntity)
  @JoinColumn()
  public users: Array<UserEntity>;
}
