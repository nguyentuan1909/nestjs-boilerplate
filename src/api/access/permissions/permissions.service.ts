import { CreatePermissionReqDto } from '@/api/access/permissions/dtos/create-permission.req.dto';
import { PermissionResDto } from '@/api/access/permissions/dtos/permission.res.dto';
import { UpdatePermissionReqDto } from '@/api/access/permissions/dtos/update-permission.req.dto';
import { PermissionEntity } from '@/api/access/permissions/permission.entity';
import { BaseService } from '@/api/base/base.service';
import { Injectable } from '@nestjs/common';
import { PermissionsRepository } from './permissions.repository';

@Injectable()
export class PermissionsService extends BaseService<
  PermissionEntity,
  PermissionResDto,
  CreatePermissionReqDto,
  UpdatePermissionReqDto
> {
  constructor(private permissionsRepository: PermissionsRepository) {
    super(permissionsRepository);
  }
}
