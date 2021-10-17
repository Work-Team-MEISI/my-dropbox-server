import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  userId: string;

  @Column('string')
  username;

  @Column('string')
  email;

  @Column('string')
  password;

  @Column('string')
  createdAt;

  @Column('string')
  updatedAt;
}
