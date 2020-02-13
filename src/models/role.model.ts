import { Entity, model, property, hasMany } from '@loopback/repository';
import {
	RolePermission,
	RolePermissionWithRelations,
	UserRole,
	UserRoleWithRelations,
} from './';

@model({ name: 'roles' })
export class Role extends Entity{
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
	name: string;

	@property({
		type: 'string',
	})
	description?: string;

	@hasMany(() => UserRole, { keyTo: 'roleId' })
	userRoles: UserRole[];

	@hasMany(() => RolePermission, { keyTo: 'roleId' })
	rolePermissions: RolePermission[];

	constructor(data?: Partial<Role>) {
		super(data);
	}
}

export interface RoleRelations {
	// describe navigational properties here
	userRoles?: UserRoleWithRelations[];
	rolePermissions?: RolePermissionWithRelations[];
}

export type RoleWithRelations = Role & RoleRelations;
