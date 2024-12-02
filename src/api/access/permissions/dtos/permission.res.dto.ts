import { BaseResDto } from '@/api/base/dto/base.res.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PermissionResDto extends BaseResDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  active: boolean;
}
