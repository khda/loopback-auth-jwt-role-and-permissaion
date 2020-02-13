import { Entity, model, property } from '@loopback/repository';

@model()
export class RevokedTokenData extends Entity {
	@property({
		type: 'string',
		required: true,
	})
	token: string;

	constructor(data?: Partial<RevokedTokenData>) {
		super(data);
	}
}

export interface RevokedTokenDataRelations {
	// describe navigational properties here
}

export type RevokedTokenDataWithRelations = RevokedTokenData & RevokedTokenDataRelations;
