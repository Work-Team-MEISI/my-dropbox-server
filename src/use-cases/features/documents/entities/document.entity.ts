import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('documents')
export class DocumentEntity {
  @PrimaryGeneratedColumn('uuid')
  public documentId;

  @Column('text')
  public name;

  @Column('text')
  public extension;

  @Column('text')
  public creator;

  @Column('bytea')
  public blob;

  @CreateDateColumn()
  public createdAt;

  @JoinTable()
  @ManyToMany((type) => UserEntity, (user) => user.documents)
  public users: Array<UserEntity>;
}
