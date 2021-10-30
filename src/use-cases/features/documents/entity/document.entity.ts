import {
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { User } from '../../users/types/user.type';

@Entity('documents')
export class DocumentEntity {
  @PrimaryGeneratedColumn()
  public documentId;

  @PrimaryColumn('text')
  public name;

  @PrimaryColumn('text')
  public extension;

  @CreateDateColumn()
  public createdAt;


  @OneToMany((type) => UserEntity, (userEntity) => userEntity)
  @JoinColumn()
  public users: Array<UserEntity>;
}
