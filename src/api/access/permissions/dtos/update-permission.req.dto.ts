import { UpdateBaseReqDto } from '@/api/base/dto/update-base.req.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdatePermissionReqDto extends UpdateBaseReqDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
