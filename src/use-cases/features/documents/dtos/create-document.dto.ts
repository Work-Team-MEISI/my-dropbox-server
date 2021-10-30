import { IsArray, IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../users/types/user.type';

import { Transform } from 'class-transformer';

export class CreateDocumentDTO {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  public extension: string;

  @IsNotEmpty()
  @IsArray()
  public users: Array<User>;

  @IsNotEmpty()
  public blob: unknown;
}
