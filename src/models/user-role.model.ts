import { Entity, model, property, belongsTo } from '@loopback/repository';
import { User, UserWithRelations } from './user.model';
import { Role, RoleWithRelations } from './role.model';

@model({
	name: 'user_roles'
})
export class UserRole extends Entity {
	@property({
		type: 'number',
		id: true,
		generated: true,
	})
	id?: number;

	@belongsTo(() => Role)
	roleId: number;

	// @belongsTo(() => User, { keyTo: 'id', keyFrom: 'userId' })
	@belongsTo(() => User)
	userId: number;

	constructor(data?: Partial<UserRole>) {
		super(data);
	}
}

export interface UserRoleRelations {
	// describe navigational properties here
	user?: UserWithRelations;
	role?: RoleWithRelations;
}

export type UserRoleWithRelations = UserRole & UserRoleRelations;
