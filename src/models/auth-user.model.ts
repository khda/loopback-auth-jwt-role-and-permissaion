import { model, property } from '@loopback/repository';

import { User } from './user.model';

@model()
export class AuthUser extends User {
	@property({
		type: 'array',
		itemType: 'number',
		required: true,
	})
	permissionIds: number[] = [];

	@property({
		type: 'array',
		itemType: 'number',
		required: true,
	})
	roleIds: number[] = [];

	constructor(data?: Partial<AuthUser>) {
		super(data);
	}
}

export interface AuthUserRelations {
	// describe navigational properties here
}

export type AuthUserWithRelations = AuthUser & AuthUserRelations;
