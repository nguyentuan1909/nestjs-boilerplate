import { ConflictException } from '@nestjs/common';
import { ErrorType } from '../../../nestjs-permission-boilerplate/src/common/enums';

export class ForeignKeyConflictException extends ConflictException {
  constructor() {
    super({
      errorType: ErrorType.ForeignKeyConflict,
      message: `Foreign key conflict`,
    });
  }
}
