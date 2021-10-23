import { IsArray, IsDate, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../users/types/user.type';

export class CreateDocumentDTO {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsDate()
  public createdAt: Date;

  @IsNotEmpty()
  @IsString()
  public extension: string;

  @IsNotEmpty()
  @IsArray()
  public users: Array<User>;

  @IsNotEmpty()
  public blob: unknown;
}
