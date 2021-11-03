import {
  Entity,
  JoinColumn,
  OneToMany,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

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

  @OneToMany((type) => UserEntity, (userEntity) => userEntity.userId)
  @JoinColumn()
  public users: Array<UserEntity>;
}
