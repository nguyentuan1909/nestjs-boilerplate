import { PermissionsModule } from '@/api/access/permissions/permissions.module';
import { RolesModule } from '@/api/access/roles/roles.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [RolesModule, PermissionsModule],
})
export class AccessModule {}
