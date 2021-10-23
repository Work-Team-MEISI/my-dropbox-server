import { IsNotEmpty, IsString } from 'class-validator';

export class FetchDocumentsDTO {
  @IsNotEmpty()
  @IsString()
  public userId: string;
}
