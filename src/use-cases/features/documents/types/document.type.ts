import { UserEntity } from '../../users/entities/user.entity';

export type Document = {
  documentId: string;
  name: string;
  createdAt: Date;
  extension: string;
  users: Array<UserEntity>;
  creator: string;
  blob?: unknown;
};
