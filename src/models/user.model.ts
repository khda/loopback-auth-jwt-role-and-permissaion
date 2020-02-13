import { Entity, model, property, hasMany } from '@loopback/repository';
import { IAuthUser } from 'loopback4-authentication';
import { UserRole, UserRoleWithRelations } from './user-role.model';
import { UserPermission, UserPermissionWithRelations } from './user-permission.model';
import { Profile } from './profile.dto';
import { Role } from './role.model';
import { Permission } from './permission.model';

@model({ name: 'users' })
export class User extends Entity implements IAuthUser {
	@property({
		type: 'number',
		id: true,
		generated: true,
	})
	id?: number;

	@property({
		type: 'string',
		required: true,
	})
	username: string;

	@property({
		type: 'string',
		required: true,
	})
	password: string;

	@property({
		required: true,
	})
	profile: Profile;

	@property({
		type: 'date',
		default: () => new Date(),
	})
	archived: Date;

	@hasMany(() => UserRole, {
		keyFrom: 'id',
		keyTo: 'userId',
		name: 'userRoles'
	})
	userRoles: UserRole[];

	@hasMany(() => UserPermission, { keyTo: 'userId' })
	userPermissions: UserPermission[];

	@property({
		type: 'array',
		itemType: 'object',
		required: true,
	})
	roles: Role[] = [];

	@property({
		type: 'array',
		itemType: 'object',
		required: true,
	})
	permissions: Permission[] = [];

	constructor(data?: Partial<User>) {
		super(data);
	}
}

export interface UserRelations {
	// describe navigational properties here
	userRoles?: UserRoleWithRelations[];
	userPermission?: UserPermissionWithRelations[];
}

export type UserWithRelations = User & UserRelations;
