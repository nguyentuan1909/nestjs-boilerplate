import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v7 } from 'uuid';

@Entity({ name: 'permissions' })
export class PermissionEntity extends AbstractEntity {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  id: string;

  @Column({
    name: 'slug',
    type: 'varchar',
    nullable: false,
    unique: true,
    length: 60,
  })
  slug: string;

  @Column({
    name: 'description',
    type: 'varchar',
    nullable: false,
    length: 160,
  })
  description: string;

  @Column({
    name: 'active',
    type: 'boolean',
    nullable: false,
    default: true,
  })
  active: boolean;

  constructor(permission?: Partial<PermissionEntity>) {
    super();
    this.id = v7();
    Object.assign(this, permission);
  }
}
