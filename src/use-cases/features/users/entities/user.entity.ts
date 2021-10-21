import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

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
}
