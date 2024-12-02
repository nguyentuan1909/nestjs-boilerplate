import { CreateRoleReqDto } from '@/api/access/roles/dtos/create-role.req.dto';
import { RoleResDto } from '@/api/access/roles/dtos/role.res.dto';
import { UpdateRoleReqDto } from '@/api/access/roles/dtos/update-role.req.dto';
import { RoleEntity } from '@/api/access/roles/role.entity';
import { BaseService } from '@/api/base/base.service';
import { Injectable } from '@nestjs/common';
import { RolesRepository } from './roles.repository';

@Injectable()
export class RolesService extends BaseService<
  RoleEntity,
  RoleResDto,
  CreateRoleReqDto,
  UpdateRoleReqDto
> {
  constructor(private rolesRepository: RolesRepository) {
    super(rolesRepository);
  }
}
