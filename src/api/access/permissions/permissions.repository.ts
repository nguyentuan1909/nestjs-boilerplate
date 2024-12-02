import { BaseRepository } from '@/api/base/base.repository';
import { Injectable } from '@nestjs/common';
import { PermissionEntity } from './permission.entity';

@Injectable()
export class PermissionsRepository extends BaseRepository<PermissionEntity> {}
