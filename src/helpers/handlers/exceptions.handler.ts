import { HttpCode, HttpException, HttpStatus } from '@nestjs/common';

export function ExceptionsHandler(exceptionType: number) {
  for (const exception in HttpStatus) {
    const error = exception as keyof HttpStatus;

    if (exceptionType === HttpStatus[error]) {
      throw new HttpException('', HttpStatus[error]);
    }
  }
}
