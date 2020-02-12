import { Entity, model, property } from '@loopback/repository';

@model()
export class RevokedToken extends Entity {
	@property({
		type: 'string',
		required: true,
	})
	token: string;


	constructor(data?: Partial<RevokedToken>) {
		super(data);
	}
}

export interface RevokedTokenRelations {
	// describe navigational properties here
}

export type RevokedTokenWithRelations = RevokedToken & RevokedTokenRelations;
