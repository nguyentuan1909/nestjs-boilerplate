import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { v7 } from 'uuid';
import { PermissionEntity } from '../permissions/permission.entity';

@Entity({ name: 'roles' })
export class RoleEntity extends AbstractEntity {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  id: string;

  @Column({
    name: 'name',
    type: 'varchar',
    unique: true,
    nullable: false,
    length: 50,
  })
  name: string;

  @Column({
    name: 'active',
    type: 'boolean',
    nullable: false,
    default: true,
  })
  active: boolean;

  @ManyToMany((type) => PermissionEntity, (permission) => permission.id, {
    lazy: true,
    cascade: true,
  })
  @JoinTable({
    name: 'roles_permissions',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions: Promise<PermissionEntity[]>;

  constructor(role?: Partial<RoleEntity>) {
    super();
    this.id = v7();
    Object.assign(this, role);
  }
}
