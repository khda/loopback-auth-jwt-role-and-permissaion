import {Entity, model, property /*, hasMany*/} from '@loopback/repository';
// import {
//   RolePermission,
//   RolePermissionWithRelations,
// } from './role-permission.model';
// import {
//   UserPermission,
//   UserPermissionWithRelations,
// } from './user-permission.model';

@model({
  name: 'permissions',
})
export class Permission extends Entity {
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

  // @hasMany(() => RolePermission, {
  // 	keyTo: 'permission_id'
  // })
  // rolePermissions: RolePermission[];

  // @hasMany(() => UserPermission, {
  // 	keyTo: 'permission_id'
  // })
  // userPermissions: UserPermission[];

  constructor(data?: Partial<Permission>) {
    super(data);
  }
}

export interface PermissionRelations {
  // describe navigational properties here
  // rolePermissions?: RolePermissionWithRelations[];
  // userPermissions?: UserPermissionWithRelations[];
}

export type PermissionWithRelations = Permission & PermissionRelations;
