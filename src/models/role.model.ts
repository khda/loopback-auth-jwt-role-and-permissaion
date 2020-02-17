import {Entity, model, property /*, hasMany*/} from '@loopback/repository';
// import {
//   RolePermission,
//   RolePermissionWithRelations,
//   UserRole,
//   UserRoleWithRelations,
// } from './';

@model({
  name: 'roles',
})
export class Role extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    name: 'id',
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    name: 'name',
  })
  name: string;

  @property({
    type: 'string',
    name: 'description',
  })
  description?: string | null;

  // @hasMany(() => UserRole, {
  // 	keyTo: 'role_id'
  // })
  // userRoles: UserRole[];

  // @hasMany(() => RolePermission, {
  // 	keyTo: 'role_id'
  // })
  // rolePermissions: RolePermission[];

  constructor(data?: Partial<Role>) {
    super(data);
  }
}

export interface RoleRelations {
  // describe navigational properties here
  // userRoles?: UserRoleWithRelations[];
  // rolePermissions?: RolePermissionWithRelations[];
}

export type RoleWithRelations = Role & RoleRelations;
