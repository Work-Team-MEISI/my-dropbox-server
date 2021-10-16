import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ForgotPasswordDTO } from './dtos/forgot-password.dto';
import SignInDTO from './dtos/sign-in.dto';
import SignUpDTO from './dtos/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { AuthenticationService } from './authentication.service';
import { AuthenticationErrorMessages } from './constants/authentication-error-messages.enum';
import { GlobalErrorMessages } from 'src/helpers/constants/global-error-messages.enum';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly _authenticationService: AuthenticationService) {}

  @Get()
  public async signIn(@Query() signInDTO: SignInDTO): Promise<string> {
    const user = await this._authenticationService
      .fetch({
        email: signInDTO.email,
      })
      .catch((error) => {
        throw new HttpException(
          GlobalErrorMessages.INTERNAL_SERVER_ERROR,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    if (user === undefined) {
      throw new HttpException(
        AuthenticationErrorMessages.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const hashedPassword = await bcrypt
      .hash(signInDTO.password, 10)
      .catch((error) => {
        throw error;
      });

    if (hashedPassword !== user.password) {
      throw new HttpException(
        AuthenticationErrorMessages.WRONG_PASSWORD,
        HttpStatus.BAD_REQUEST,
      );
    }
    return JSON.stringify(user);
  }

  @Post()
  public signUp(@Query() signUpDTO: SignUpDTO): string {
    return '';
  }

  @Get()
  public forgotPassword(@Query() forgotPasswordDTO: ForgotPasswordDTO): string {
    return '';
  }
}
