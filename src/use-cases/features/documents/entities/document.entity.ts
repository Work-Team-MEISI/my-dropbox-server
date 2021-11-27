import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

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

  @Column('text', { array: true })
  public users: Array<string>;

  @Column('jsonb')
  public blob;

  @CreateDateColumn()
  public createdAt;
}
