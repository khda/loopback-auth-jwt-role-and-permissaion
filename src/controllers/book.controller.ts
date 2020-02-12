import { inject } from '@loopback/context';
import { AuthenticationBindings } from 'loopback4-authentication';
import {
	Getter,
	Count,
	CountSchema,
	Filter,
	repository,
	Where,
} from '@loopback/repository';
import {
	post,
	param,
	get,
	getFilterSchemaFor,
	getModelSchemaRef,
	getWhereSchemaFor,
	patch,
	put,
	del,
	requestBody,
} from '@loopback/rest';
import { User, Book } from '../models';
import { BookRepository } from '../repositories';

import { authenticate, STRATEGY } from 'loopback4-authentication';
// import {authorize} from 'loopback4-authorization';
// import {PermissionKey} from '../constants/permission-key.enum';

export class BookController {
	constructor(
		@repository(BookRepository)
		public bookRepository: BookRepository,
		@inject.getter(AuthenticationBindings.CURRENT_USER)
		private readonly getCurrentUser: Getter<User>,
	) { }

	@post('/books', {
		responses: {
			'200': {
				description: 'Book model instance',
				content: { 'application/json': { schema: getModelSchemaRef(Book) } },
			},
		},
	})
	async create(
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(Book, {
						title: 'NewBook',
						exclude: ['id'],
					}),
				},
			},
		})
		book: Omit<Book, 'id'>,
	): Promise<Book> {
		return this.bookRepository.create(book);
	}

	@authenticate(STRATEGY.BEARER)
	// @authorize([PermissionKey.ViewBook])
	@get('/books/count', {
		responses: {
			'200': {
				description: 'Book model count',
				content: { 'application/json': { schema: CountSchema } },
			},
		},
	})
	async count(
		@param.query.object('where', getWhereSchemaFor(Book)) where?: Where<Book>,
	): Promise<Count> {

    const currentUser = await this.getCurrentUser();
		console.log('currentUser:', currentUser);

		return this.bookRepository.count(where);
	}

	@get('/books', {
		responses: {
			'200': {
				description: 'Array of Book model instances',
				content: {
					'application/json': {
						schema: {
							type: 'array',
							items: getModelSchemaRef(Book, { includeRelations: true }),
						},
					},
				},
			},
		},
	})
	async find(
		@param.query.object('filter', getFilterSchemaFor(Book)) filter?: Filter<Book>,
	): Promise<Book[]> {
		return this.bookRepository.find(filter);
	}

	@patch('/books', {
		responses: {
			'200': {
				description: 'Book PATCH success count',
				content: { 'application/json': { schema: CountSchema } },
			},
		},
	})
	async updateAll(
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(Book, { partial: true }),
				},
			},
		})
		book: Book,
		@param.query.object('where', getWhereSchemaFor(Book)) where?: Where<Book>,
	): Promise<Count> {
		return this.bookRepository.updateAll(book, where);
	}

	@get('/books/{id}', {
		responses: {
			'200': {
				description: 'Book model instance',
				content: {
					'application/json': {
						schema: getModelSchemaRef(Book, { includeRelations: true }),
					},
				},
			},
		},
	})
	async findById(
		@param.path.number('id') id: number,
		@param.query.object('filter', getFilterSchemaFor(Book)) filter?: Filter<Book>
	): Promise<Book> {
		return this.bookRepository.findById(id, filter);
	}

	@patch('/books/{id}', {
		responses: {
			'204': {
				description: 'Book PATCH success',
			},
		},
	})
	async updateById(
		@param.path.number('id') id: number,
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(Book, { partial: true }),
				},
			},
		})
		book: Book,
	): Promise<void> {
		await this.bookRepository.updateById(id, book);
	}

	@put('/books/{id}', {
		responses: {
			'204': {
				description: 'Book PUT success',
			},
		},
	})
	async replaceById(
		@param.path.number('id') id: number,
		@requestBody() book: Book,
	): Promise<void> {
		await this.bookRepository.replaceById(id, book);
	}

	@del('/books/{id}', {
		responses: {
			'204': {
				description: 'Book DELETE success',
			},
		},
	})
	async deleteById(@param.path.number('id') id: number): Promise<void> {
		await this.bookRepository.deleteById(id);
	}
}
