import { CreateRoleReqDto } from '@/api/access/roles/dtos/create-role.req.dto';
import { RoleResDto } from '@/api/access/roles/dtos/role.res.dto';
import { UpdateRoleReqDto } from '@/api/access/roles/dtos/update-role.req.dto';
import { RolesService } from '@/api/access/roles/roles.service';
import { TOKEN_NAME } from '@/common/constants';
import { PageOptionsDto } from '@/common/dto/offset-pagination/page-options.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { ApiGlobalResponse } from '@/decorators/api-global.res.decorator';
import { Permissions } from '@/decorators/permission.decorator';
import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Roles')
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: 'access/roles',
  version: '1',
})
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ description: 'Get a paginated role list' })
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
    example: 'admin',
  })
  @Permissions(
    'admin.access.roles.read',
    'admin.access.roles.create',
    'admin.access.roles.update',
  )
  @Get()
  public getRoles(
    @Query() pagination: PageOptionsDto,
  ): Promise<OffsetPaginatedDto<RoleResDto>> {
    return this.rolesService.findMany(pagination);
  }

  @ApiOperation({ description: 'Get role by id' })
  @ApiGlobalResponse(RoleResDto)
  @Permissions(
    'admin.access.roles.read',
    'admin.access.roles.create',
    'admin.access.roles.update',
  )
  @Get('/:id')
  public getRoleById(@Param('id') id: string): Promise<RoleResDto> {
    return this.rolesService.findById(id);
  }

  @ApiOperation({ description: 'Create new role' })
  @ApiGlobalResponse(RoleResDto)
  @ApiConflictResponse({ description: 'Role already exists' })
  @Permissions('admin.access.roles.create')
  @Post()
  public createRole(@Body() roleDto: CreateRoleReqDto): Promise<RoleResDto> {
    return this.rolesService.create(roleDto);
  }

  @ApiOperation({ description: 'Update role by id' })
  @ApiGlobalResponse(RoleResDto)
  @ApiConflictResponse({ description: 'Role already exists' })
  @Permissions('admin.access.roles.update')
  @Put('/:id')
  public updateRole(
    @Param('id') id: string,
    @Body() roleDto: UpdateRoleReqDto,
  ): Promise<boolean> {
    return this.rolesService.update(id, roleDto);
  }
}
