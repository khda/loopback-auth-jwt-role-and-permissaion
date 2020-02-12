import { Model, model, property } from '@loopback/repository';
import { Contact } from './contact.dto';

@model({
	name: 'profiles',
})
export class Profile extends Model {
	@property({
		type: 'string',
		required: true,
	})
	firstName: string;

	@property({
		type: 'string',
	})
	lastName?: string;

	@property({
		type: 'date',
	})
	birthDate?: Date;

	@property()
	contact?: Contact;

	constructor(data?: Partial<Profile>) {
		super(data);
	}
}

export interface ProfileRelations {
	// describe navigational properties here
}

export type ProfileWithRelations = Profile & ProfileRelations;
