import {model, property} from '@loopback/repository';

import {User} from './user.model';
import {Role} from './role.model';
import {Permission} from './permission.model';

@model({
  name: 'auth_user',
})
export class AuthUser extends User {
  @property({
    type: 'array',
    itemType: 'object',
    required: true,
    name: 'roles',
  })
  roles: Role[] = [];

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
    name: 'permissions',
  })
  permissions: Permission[] = [];

  constructor(data?: Partial<AuthUser>) {
    super(data);
  }
}

export interface AuthUserRelations {
  // describe navigational properties here
}

export type AuthUserWithRelations = AuthUser & AuthUserRelations;
