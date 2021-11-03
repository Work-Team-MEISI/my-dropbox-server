import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DocumentEntity } from '../../documents/entities/document.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  userId: string;

  @Column('text')
  username: string;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @ManyToOne(
    (type) => DocumentEntity,
    (documentEntity) => documentEntity.documentId,
  )
  @JoinColumn()
  documents: Array<DocumentEntity>;
}
