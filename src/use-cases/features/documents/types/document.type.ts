import { User } from '../../users/types/user.type';

export type Document = {
  documentId: string;
  name: string;
  createdAt: Date;
  extension: string;
  users: Array<User>;
  blob?: unknown;
};
