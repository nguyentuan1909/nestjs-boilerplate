import { PermissionResDto } from '@/api/access/permissions/dtos/permission.res.dto';
import { PermissionEntity } from '@/api/access/permissions/permission.entity';
import { RoleResDto } from '@/api/access/roles/dtos/role.res.dto';
import { RoleEntity } from '@/api/access/roles/role.entity';
import { UserResDto } from '@/api/user/dto/user.res.dto';
import { UserStatus } from '@/api/user/user-status.enum';
import { AbstractEntity } from '@/database/entities/abstract.entity';
import { hashPassword as hashPass } from '@/utils/password.util';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { v7 } from 'uuid';
import { SessionEntity } from './session.entity';

@Entity('user')
export class UserEntity extends AbstractEntity {
  constructor(data?: Partial<UserEntity>) {
    super();
    this.id = v7();
    Object.assign(this, data);
  }

  @PrimaryColumn('uuid', { primaryKeyConstraintName: 'PK_user_id' })
  id: string;
  @Column({
    length: 50,
    nullable: true,
  })
  @Index('UQ_user_username', {
    where: '"deleted_at" IS NULL',
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  lastName: string;

  @Column()
  @Index('UQ_user_email', { where: '"deleted_at" IS NULL', unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: '' })
  bio?: string;

  @Column({ default: '' })
  image?: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  isSuperUser: boolean;

  @DeleteDateColumn({
    type: 'timestamptz',
    default: null,
  })
  deletedAt: Date;

  @OneToMany(() => SessionEntity, (session) => session.user)
  sessions?: SessionEntity[];

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.Active,
    nullable: false,
  })
  status: UserStatus;

  @ManyToMany(() => RoleEntity, (role) => role.id, {
    lazy: true,
    cascade: true,
  })
  @JoinTable({
    name: 'users_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: Promise<RoleEntity[]>;

  @ManyToMany(() => PermissionEntity, (permission) => permission.id, {
    lazy: true,
    cascade: true,
  })
  @JoinTable({
    name: 'users_permissions',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions: Promise<PermissionEntity[]>;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await hashPass(this.password);
    }
  }

  public async toDtoWithRelations(): Promise<UserResDto> {
    const dto = new UserResDto();

    dto.id = this.id;
    dto.username = this.username;
    dto.firstName = this.firstName;
    dto.lastName = this.lastName;
    dto.permissions = await Promise.all(
      (await this.permissions).map((p) => p.toDto(PermissionResDto)),
    );
    dto.roles = await Promise.all(
      (await this.roles).map((role) => role.toDto(RoleResDto)),
    );
    dto.isSuperUser = this.isSuperUser;
    dto.status = this.status;
    return dto;
  }
}
