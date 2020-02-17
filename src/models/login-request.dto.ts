import { Model, model, property } from '@loopback/repository';

@model({
	name: 'login_request',
})
export class LoginRequest extends Model {
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

	constructor(data?: Partial<LoginRequest>) {
		super(data);
	}
}

export interface LoginRequestRelations {
	// describe navigational properties here
}

export type LoginRequestWithRelations = LoginRequest & LoginRequestRelations;
