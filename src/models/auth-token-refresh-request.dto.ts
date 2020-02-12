import { Model, model, property } from '@loopback/repository';

@model()
export class AuthTokenRefreshRequest extends Model {
	@property({
		type: 'string',
		required: true,
	})
	refreshToken: string;

	constructor(data?: Partial<AuthTokenRefreshRequest>) {
		super(data);
	}
}

export interface AuthTokenRefreshRequestRelations {
	// describe navigational properties here
}

export type AuthTokenRefreshRequestWithRelations =
	AuthTokenRefreshRequest & AuthTokenRefreshRequestRelations;
