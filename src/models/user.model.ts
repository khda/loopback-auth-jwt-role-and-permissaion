import { Entity, model, property /*, hasMany*/ } from '@loopback/repository';
import { IAuthUser } from 'loopback4-authentication';
// import {UserRole, UserRoleWithRelations} from './user-role.model';
// import {
//   UserPermission,
//   UserPermissionWithRelations,
// } from './user-permission.model';

@model({
	name: 'users',
	settings: {
		// hiddenProperties: ['password']
	},
})
export class User extends Entity implements IAuthUser {
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
		name: 'username',
	})
	username: string;

	@property({
		type: 'string',
		required: true,
		name: 'password',
	})
	password: string;

	@property({
		type: 'boolean',
		required: true,
		default: false,
		name: 'archived',
	})
	archived: boolean;

	// @hasMany(() => UserRole, {
	//   keyFrom: 'id',
	//   keyTo: 'userId',
	//   name: 'userRoles',
	// })
	// userRoles: UserRole[];

	// @hasMany(() => UserPermission, {
	//   keyFrom: 'id',
	//   keyTo: 'userId',
	//   // keyTo: 'user_id',
	//   name: 'userPermissions',
	// })
	// userPermissions: UserPermission[];

	constructor(data?: Partial<User>) {
		super(data);
	}
}

export interface UserRelations {
	// describe navigational properties here
	// userRoles?: UserRoleWithRelations[];
	// userPermission?: UserPermissionWithRelations[];
}

export type UserWithRelations = User & UserRelations;
