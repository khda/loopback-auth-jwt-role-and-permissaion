import { Entity, model, property } from '@loopback/repository';

@model({
	name: 'books',
})
export class Book extends Entity {
	@property({
		type: 'number',
		id: true,
		generated: true,
	})
	id?: number;

	@property({
		type: 'string',
		required: true,
	})
	name: string;


	constructor(data?: Partial<Book>) {
		super(data);
	}
}

export interface BookRelations {
	// describe navigational properties here
}

export type BookWithRelations = Book & BookRelations;
