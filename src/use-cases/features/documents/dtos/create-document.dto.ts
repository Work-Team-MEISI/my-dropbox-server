import { IsArray, IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../users/types/user.type';

export class CreateDocumentDTO {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  public extension: string;

  @IsNotEmpty()
  @IsString()
  public creator: string;

  @IsNotEmpty()
  @IsArray()
  public users: Array<string>;

  @IsNotEmpty()
  public blob: unknown;
}
