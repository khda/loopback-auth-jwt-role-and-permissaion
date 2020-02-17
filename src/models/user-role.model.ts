import {Entity, model, property /*, belongsTo*/} from '@loopback/repository';
// import {User, UserWithRelations} from './user.model';
// import {Role, RoleWithRelations} from './role.model';

@model({
  name: 'user_roles',
  // settings: {
  // 	foreignKeys: {
  // 		// eslint-disable-next-line @typescript-eslint/camelcase
  // 		user_roles_user_id_fkey: {
  // 			name: 'user_roles_user_id_fkey',
  // 			entity: 'User',
  // 			entityKey: 'id',
  // 			foreignKey: 'user_id',
  // 		},
  // 	},
  // },
})
export class UserRole extends Entity {
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
    name: 'role_id',
  })
  roleId: number;

  // @belongsTo(() => Role, {
  // 	keyTo: 'id',
  // 	keyFrom: 'role_id',
  // 	name: 'roleId',
  // })
  // roleId: number;

  // @belongsTo(() => User, {
  // 	keyTo: 'id',
  // 	keyFrom: 'user_id',
  // 	name: 'userId',
  // })
  // userId: number;

  constructor(data?: Partial<UserRole>) {
    super(data);
  }
}

export interface UserRoleRelations {
  // describe navigational properties here
  // user?: UserWithRelations;
  // role?: RoleWithRelations;
}

export type UserRoleWithRelations = UserRole & UserRoleRelations;
