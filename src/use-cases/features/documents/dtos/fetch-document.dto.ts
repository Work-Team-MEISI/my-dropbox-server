import { IsNotEmpty, IsString } from 'class-validator';

export class FetchDocumentDTO {
  @IsNotEmpty()
  @IsString()
  public documentId: string;
}
