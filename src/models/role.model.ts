import { Entity, model, property, hasMany } from '@loopback/repository';
import {
	RolePermission,
	RolePermissionWithRelations,
} from './role-permission.model';
import { UserRole, UserRoleWithRelations } from './user-role.model';

@model({
	name: 'roles',
})
export class Role extends Entity {
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

	@hasMany(() => RolePermission, { keyTo: 'roleId' })
	rolePermissions: RolePermission[];

	@hasMany(() => UserRole, { keyTo: 'roleId' })
	userRoles: UserRole[];

	constructor(data?: Partial<Role>) {
		super(data);
	}
}

export interface RoleRelations {
	// describe navigational properties here
	rolePermissions?: RolePermissionWithRelations[];
	userRoles?: UserRoleWithRelations[];
}

export type RoleWithRelations = Role & RoleRelations;
