import { UnauthorizedException } from '@nestjs/common';
import { ErrorType } from '../../../nestjs-permission-boilerplate/src/common/enums';

export class InvalidCredentialsException extends UnauthorizedException {
  constructor() {
    super({
      errorType: ErrorType.InvalidCredentials,
      message: 'Invalid credentials',
    });
  }
}