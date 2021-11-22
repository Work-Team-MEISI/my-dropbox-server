import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Query,
  Request,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ExceptionsHandler } from 'src/helpers/handlers/exceptions.handler';
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

    const decodedToken = this._jwtService.decode(token.split(' ')[1]);

    const userId = { userId: decodedToken.sub };

    const user = await this._profileService.fetch(userId).catch((error) => {
      throw ExceptionsHandler(HttpStatus.INTERNAL_SERVER_ERROR);
    });

    if (typeof user === 'undefined') {
      throw ExceptionsHandler(HttpStatus.NOT_FOUND);
    }

    return user;
  }

  @Get('params')
  public async fetchUserByEmail(@Query() fetchUserByEmailDTO): Promise<User> {
    const user = await this._profileService
      .fetch(fetchUserByEmailDTO)
      .catch((error) => {
        throw ExceptionsHandler(HttpStatus.INTERNAL_SERVER_ERROR);
      });

    if (typeof user === 'undefined') {
      throw ExceptionsHandler(HttpStatus.NOT_FOUND);
    }

    return user;
  }

  @Get(':userId')
  public async fetchUserById(@Param('userId') fetchUserByIdDTO): Promise<User> {
    const userId = { userId: fetchUserByIdDTO };
    console.log(userId);

    const user = await this._profileService.fetch(userId).catch((error) => {
      throw ExceptionsHandler(HttpStatus.INTERNAL_SERVER_ERROR);
    });

    if (typeof user === 'undefined') {
      throw ExceptionsHandler(HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
