import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteDocumentDTO {
  @IsNotEmpty()
  @IsString()
  public documentId: string;
}
