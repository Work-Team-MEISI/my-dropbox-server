import {
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { User } from '../../users/types/user.type';

@Entity('documents')
export class DocumentEntity {
  @PrimaryGeneratedColumn()
  public documentId;

  @Column('text')
  public name;

  @Column('text')
  public extension;

  @Column('bytea')
  public blob;

  @CreateDateColumn()
  public createdAt;


  @OneToMany((type) => UserEntity, (userEntity) => userEntity)
  @JoinColumn()
  public users: Array<UserEntity>;
}
