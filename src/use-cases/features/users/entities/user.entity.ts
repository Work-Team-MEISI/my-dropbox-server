import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryColumn()
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
