import { Entity, model, property, hasMany } from '@loopback/repository';
import { RolePermission, RolePermissionWithRelations } from './role-permission.model';
import { UserPermission, UserPermissionWithRelations } from './user-permission.model';

@model({
	name: 'permissions',
})
export class Permission extends Entity {
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

	@hasMany(() => RolePermission, { keyTo: 'permissionId' })
	rolePermissions: RolePermission[];

	@hasMany(() => UserPermission, { keyTo: 'permissionId' })
	userPermissions: UserPermission[];

	constructor(data?: Partial<Permission>) {
		super(data);
	}
}

export interface PermissionRelations {
	// describe navigational properties here
	rolePermissions?: RolePermissionWithRelations[];
	userPermissions?: UserPermissionWithRelations[];
}

export type PermissionWithRelations = Permission & PermissionRelations;
