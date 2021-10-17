import { HttpCode, HttpException, HttpStatus } from '@nestjs/common';

export function ExceptionsHandler(exceptionType: number): HttpException {
  for (const exception of Array<HttpStatus>()) {
    if (exceptionType === exception) {
      return new HttpException('', exception);
    }
  }
}
