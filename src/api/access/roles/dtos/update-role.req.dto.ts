import { CreateRoleReqDto } from '@/api/access/roles/dtos/create-role.req.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateRoleReqDto extends CreateRoleReqDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
