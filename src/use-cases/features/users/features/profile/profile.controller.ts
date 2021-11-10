import { Body, Controller, Get, HttpStatus, Request } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ExceptionsHandler } from 'src/helpers/handlers/exceptions.handler';
import { FetchUserDTO } from '../../dtos/fetch-user.dto';
import { User } from '../../types/user.type';
import { ProfileService } from './profile.service';

@Controller('users/profile')
export class ProfileController {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _profileService: ProfileService,
  ) {}

  @Get('')
  public async fetchUser(@Request() request): Promise<User> {
    const token: string = request.headers.authorization;

    const splitedToken = token.split(' ');

    const decodedToken = this._jwtService.decode(splitedToken[1]);

    const userId = { userId: decodedToken.sub };

    const user = this._profileService.fetch(userId).catch((error) => {
      throw ExceptionsHandler(HttpStatus.INTERNAL_SERVER_ERROR);
    });

    if (typeof user === 'undefined') {
      throw ExceptionsHandler(HttpStatus.NOT_FOUND);
    }

    return user;
  }

  @Get('')
  public async fetchUserByEmail(
    @Body() fetchUserDTO: FetchUserDTO,
  ): Promise<User> {
    const data = { email: fetchUserDTO.email };

    const user = this._profileService.fetch(data).catch((error) => {
      throw ExceptionsHandler(HttpStatus.INTERNAL_SERVER_ERROR);
    });

    if (typeof user === 'undefined') {
      throw ExceptionsHandler(HttpStatus.NOT_FOUND);
    }

    return user;
  }
}