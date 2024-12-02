import { PermissionResDto } from '@/api/access/permissions/dtos/permission.res.dto';
import { BaseResDto } from '@/api/base/dto/base.res.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RoleResDto extends BaseResDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: [PermissionResDto] })
  permissions: PermissionResDto[];

  @ApiProperty()
  active: boolean;
}
