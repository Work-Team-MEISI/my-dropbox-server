export type Document = {
  documentId: string;
  name: string;
  createdAt: Date;
  extension: string;
  users: Array<string>;
  creator: string;
  blob?: unknown;
};
