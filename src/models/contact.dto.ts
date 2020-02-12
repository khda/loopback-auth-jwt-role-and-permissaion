import { Model, model, property } from '@loopback/repository';

@model({
	name: 'contacts',
})
export class Contact extends Model {
	@property({
		type: 'string',
	})
	phone?: string;

	@property({
		type: 'string',
	})
	email?: string;

	@property({
		type: 'string',
	})
	address?: string;


	constructor(data?: Partial<Contact>) {
		super(data);
	}
}

export interface ContactRelations {
	// describe navigational properties here
}

export type ContactWithRelations = Contact & ContactRelations;
