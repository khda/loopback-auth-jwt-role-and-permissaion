import { Model, model, property } from '@loopback/repository';

@model({
	name: 'token_response',
})
export class TokenResponse extends Model {
	@property({
		type: 'string',
		required: true,
		name: 'access_token',
	})
	accessToken: string;

	@property({
		type: 'string',
		required: true,
		name: 'refresh_token',
	})
	refreshToken: string;

	constructor(data?: Partial<TokenResponse>) {
		super(data);
	}
}

export interface TokenResponseRelations {
	// describe navigational properties here
}

export type TokenResponseWithRelations = TokenResponse & TokenResponseRelations;
