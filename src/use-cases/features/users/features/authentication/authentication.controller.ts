import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ExceptionsHandler } from 'src/helpers/handlers/exceptions.handler';
import { User } from '../../types/user.type';
import { AuthenticationService } from './authentication.service';
import { ForgotPasswordDTO } from './dtos/forgot-password.dto';
import * as bcrypt from 'bcrypt';
import { SignInDTO } from './dtos/sign-in.dto';
import { SignUpDTO } from './dtos/sign-up.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('users/authentication')
export class AuthenticationController {
  constructor(
    private readonly _authenticationService: AuthenticationService,
    private readonly _jsonWebTokenService: JwtService,
  ) {}

  @Get('sign-in')
  public async signIn(
    @Query() signInDTO: SignInDTO,
  ): Promise<{ user: User; idToken: string }> {
    const searchEmail = { email: signInDTO.email };

    console.log(signInDTO);

    const user = await this._authenticationService
      .fetch(searchEmail)
      .catch((error) => {
        throw ExceptionsHandler(HttpStatus.INTERNAL_SERVER_ERROR);
      });

    if (typeof user === 'undefined') {
      throw ExceptionsHandler(HttpStatus.NOT_FOUND);
    }

    const { password } = signInDTO;

    const comparePassword = await bcrypt.compare(password, user.password);

    if (comparePassword === false) {
      throw ExceptionsHandler(HttpStatus.BAD_REQUEST);
    }

    const payload = { username: user.username, sub: user.userId };

    const idToken = this._jsonWebTokenService.sign(payload);

    return { user: user, idToken: idToken };
  }

  @Post('sign-up')
  public async signUp(@Body() signUpDTO: SignUpDTO): Promise<User> {
    const searchedEmail = { email: signUpDTO.email };

    const searchedUser = await this._authenticationService
      .fetch(searchedEmail)
      .catch((error) => {
        throw ExceptionsHandler(HttpStatus.INTERNAL_SERVER_ERROR);
      });

    if (typeof searchedUser !== 'undefined') {
      throw ExceptionsHandler(HttpStatus.FOUND);
    }

    const { email, username, password } = signUpDTO;

    const newUser = {
      email: email,
      username: username,
      password: await bcrypt.hash(password, 10),
    };

    const createdUser = await this._authenticationService
      .create(newUser)
      .catch((error) => {
        throw ExceptionsHandler(HttpStatus.INTERNAL_SERVER_ERROR);
      });

    return createdUser;
  }

  @Put('forgot-password')
  public async forgotPassword(
    @Query() email: string,
    @Body() forgotPasswordDTO: ForgotPasswordDTO,
  ): Promise<User> {
    const searchedUser = await this._authenticationService
      .fetch(email)
      .catch((error) => {
        throw ExceptionsHandler(HttpStatus.INTERNAL_SERVER_ERROR);
      });

    if (typeof searchedUser === 'undefined') {
      throw ExceptionsHandler(HttpStatus.NOT_FOUND);
    }

    const hashedPassword = await bcrypt.hash(forgotPasswordDTO.password, 10);

    const updatePassword = { password: hashedPassword };

    this._authenticationService.update(email, updatePassword).catch((error) => {
      throw ExceptionsHandler(HttpStatus.INTERNAL_SERVER_ERROR);
    });

    const updatedUser = await this._authenticationService
      .fetch(email)
      .catch((error) => {
        throw ExceptionsHandler(HttpStatus.INTERNAL_SERVER_ERROR);
      });

    return updatedUser;
  }
}
