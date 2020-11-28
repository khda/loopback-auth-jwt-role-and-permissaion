import { Entity, model, property } from '@loopback/repository';

@model({ name: 'user_roles' })
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

	constructor(data?: Partial<UserRole>) {
		super(data);
	}
}

export interface UserRoleRelations {
	// describe navigational properties here
}

export type UserRoleWithRelations = UserRole & UserRoleRelations;
