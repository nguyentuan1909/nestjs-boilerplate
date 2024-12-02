import { ForbiddenException } from '@nestjs/common';
import { ErrorType } from '../../../nestjs-permission-boilerplate/src/common/enums';

export class InvalidCurrentPasswordException extends ForbiddenException {
  constructor() {
    super({
      errorType: ErrorType.InvalidCurrentPassword,
      message: 'The current password is invalid',
    });
  }
}
