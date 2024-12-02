import { BaseRepository } from '@/api/base/base.repository';
import { Injectable } from '@nestjs/common';
import { RoleEntity } from './role.entity';

@Injectable()
export class RolesRepository extends BaseRepository<RoleEntity> {}
