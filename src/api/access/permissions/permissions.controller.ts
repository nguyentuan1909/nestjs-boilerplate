import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { CreatePermissionReqDto } from '@/api/access/permissions/dtos/create-permission.req.dto';
import { PermissionResDto } from '@/api/access/permissions/dtos/permission.res.dto';
import { UpdatePermissionReqDto } from '@/api/access/permissions/dtos/update-permission.req.dto';
import { TOKEN_NAME } from '@/common/constants';
import { PageOptionsDto } from '@/common/dto/offset-pagination/page-options.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { ApiGlobalResponse } from '@/decorators/api-global.res.decorator';
import { Permissions } from '@/decorators/permission.decorator';
import { SuperUserGuard } from '@/guards/super-auth.guard';
import { PermissionsService } from './permissions.service';

@ApiTags('Permissions')
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: 'access/permissions',
  version: '1',
})
export class PermissionsController {
  constructor(private permissionsService: PermissionsService) {}

  @ApiOperation({ description: 'Get a paginated permission list' })
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
    example: 'admin',
  })
  @Permissions(
    'admin.access.permissions.read',
    'admin.access.permissions.create',
    'admin.access.permissions.update',
    'admin.access.roles.create',
    'admin.access.roles.update',
  )
  @Get()
  public list(
    @Query() pagination: PageOptionsDto,
  ): Promise<OffsetPaginatedDto<PermissionResDto>> {
    return this.permissionsService.findMany(pagination);
  }

  @ApiOperation({ description: 'Get permission by id' })
  @ApiGlobalResponse(PermissionResDto)
  @Permissions(
    'admin.access.permissions.read',
    'admin.access.permissions.create',
    'admin.access.permissions.update',
    'admin.access.roles.create',
    'admin.access.roles.update',
  )
  @Get('/:id')
  public getPermissionById(@Param('id') id: string): Promise<PermissionResDto> {
    return this.permissionsService.findById(id);
  }

  @ApiOperation({ description: 'Create new permission' })
  @ApiGlobalResponse(PermissionResDto)
  @ApiConflictResponse({ description: 'Permission already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.permissions.create')
  @Post()
  public createPermission(
    @Body() permissionDto: CreatePermissionReqDto,
  ): Promise<PermissionResDto> {
    return this.permissionsService.create(permissionDto);
  }

  @ApiOperation({ description: 'Update permission by id' })
  @ApiGlobalResponse(PermissionResDto)
  @ApiConflictResponse({ description: 'Permission already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.permissions.update')
  @Put('/:id')
  public updatePermission(
    @Param('id') id: string,
    @Body() permissionDto: UpdatePermissionReqDto,
  ): Promise<boolean> {
    return this.permissionsService.update(id, permissionDto);
  }
}
