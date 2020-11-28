import { Entity, model, property } from '@loopback/repository';

@model({ name: 'user_permissions' })
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
}

export type UserPermissionWithRelations = UserPermission &
	UserPermissionRelations;
