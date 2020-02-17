import {Entity, model, property /*, belongsTo*/} from '@loopback/repository';
// import {User, UserWithRelations} from './user.model';
// import {Permission, PermissionWithRelations} from './permission.model';

@model({
  name: 'user_permissions',
})
export class UserPermission extends Entity {
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
    name: 'user_id',
  })
  userId: number;

  @property({
    type: 'number',
    required: true,
    name: 'permission_id',
  })
  permissionId: number;

  // @belongsTo(() => Permission, {
  // 	keyTo: 'id',
  // 	keyFrom: 'permission_id',
  // 	name: 'permissionId',
  // })
  // permissionId: number;

  // @belongsTo(() => User, {
  // 	keyTo: 'id',
  // 	keyFrom: 'user_id',
  // 	name: 'userId',
  // })
  // userId: number;

  @property({
    type: 'boolean',
    required: true,
    default: true,
    name: 'allowed',
  })
  allowed: boolean;

  constructor(data?: Partial<UserPermission>) {
    super(data);
  }
}

export interface UserPermissionRelations {
  // describe navigational properties here
  // user?: UserWithRelations;
  // permission?: PermissionWithRelations;
}

export type UserPermissionWithRelations = UserPermission &
  UserPermissionRelations;
