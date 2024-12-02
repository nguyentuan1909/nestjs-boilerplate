import { PermissionResDto } from '@/api/access/permissions/dtos/permission.res.dto';
import { RoleResDto } from '@/api/access/roles/dtos/role.res.dto';
import { BaseResDto } from '@/api/base/dto/base.res.dto';
import { UserStatus } from '@/api/user/user-status.enum';
import {
  BooleanField,
  ClassField,
  StringField,
  StringFieldOptional,
} from '@/decorators/field.decorators';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResDto extends BaseResDto {
  @StringField()
  @Expose()
  id: string;

  @StringField()
  @Expose()
  username: string;

  @StringField()
  @Expose()
  firstName: string;

  @StringField()
  @Expose()
  lastName: string;

  @StringField()
  @Expose()
  email: string;

  @StringFieldOptional()
  @Expose()
  bio?: string;

  @StringField()
  @Expose()
  image: string;

  @BooleanField()
  isSuperUser: boolean;

  roles: RoleResDto[];

  permissions: PermissionResDto[];

  status: UserStatus;

  @ClassField(() => Date)
  @Expose()
  createdAt: Date;

  @ClassField(() => Date)
  @Expose()
  updatedAt: Date;
}
