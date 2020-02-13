import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User, UserWithRelations} from './user.model';
import {Permission, PermissionWithRelations} from './permission.model';

@model({
  name: 'user_permissions',
})
export class UserPermission extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => Permission)
  permissionId: number;

  @belongsTo(() => User)
  userId: number;

  @property({
    type: 'boolean',
    required: true,
    default: true,
  })
  allowed: boolean;

  constructor(data?: Partial<UserPermission>) {
    super(data);
  }
}

export interface UserPermissionRelations {
  // describe navigational properties here
  user?: UserWithRelations;
  permission?: PermissionWithRelations;
}

export type UserPermissionWithRelations = UserPermission &
  UserPermissionRelations;
