import { IsString } from 'class-validator';

export class FetchUserByIdDTO {
  @IsString()
  userId: string;
}
