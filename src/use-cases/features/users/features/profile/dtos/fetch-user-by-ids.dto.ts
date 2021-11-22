import { IsArray } from 'class-validator';

export class FetchUserByIdsDTO {
  @IsArray()
  usersId: Array<string>;
}
