import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DocumentEntity } from '../../documents/entities/document.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column('text')
  username: string;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @ManyToMany((type) => DocumentEntity, (document) => document.users, {
    cascade: true,
  })
  public documents: Array<DocumentEntity>;
}
