import {Entity, model, property /*, belongsTo*/} from '@loopback/repository';
// import {Role, RoleWithRelations} from './role.model';
// import {Permission, PermissionWithRelations} from './permission.model';

@model({
  name: 'role_permissions',
})
export class RolePermission extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    name: 'id',
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
    name: 'role_id',
  })
  roleId: number;

  @property({
    type: 'number',
    required: true,
    name: 'permission_id',
  })
  permissionId: number;

  // @belongsTo(() => Role)
  // roleId: number;

  // @belongsTo(() => Permission)
  // permissionId: number;

  constructor(data?: Partial<RolePermission>) {
    super(data);
  }
}

export interface RolePermissionRelations {
  // describe navigational properties here
  // role?: RoleWithRelations;
  // permission?: PermissionWithRelations;
}

export type RolePermissionWithRelations = RolePermission &
  RolePermissionRelations;
