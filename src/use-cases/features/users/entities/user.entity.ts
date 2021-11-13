import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
