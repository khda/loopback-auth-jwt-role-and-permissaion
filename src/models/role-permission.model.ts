import { Entity, model, property } from '@loopback/repository';

@model({ name: 'role_permissions' })
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

	constructor(data?: Partial<RolePermission>) {
		super(data);
	}
}

export interface RolePermissionRelations {
	// describe navigational properties here
}

export type RolePermissionWithRelations = RolePermission &
	RolePermissionRelations;
