import {
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
import { UserRole } from '../models';
import { UserRoleRepository } from '../repositories';
import { authenticate, STRATEGY } from 'loopback4-authentication';
import { authorize } from 'loopback4-authorization';
import { OPERATION_SECURITY_SPEC } from '../utils/security-spec';

export class UserRoleController {
	constructor(
		@repository(UserRoleRepository)
		public userRoleRepository: UserRoleRepository,
	) {}

	@authenticate(STRATEGY.BEARER)
	@authorize(['Create'])
	@post('/user-roles', {
		security: OPERATION_SECURITY_SPEC,
		responses: {
			'200': {
				description: 'UserRole model instance',
				content: {
					'application/json': { schema: getModelSchemaRef(UserRole) },
				},
			},
		},
	})
	async create(
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(UserRole, {
						title: 'NewUserRole',
						exclude: ['id'],
					}),
				},
			},
		})
		userRole: Omit<UserRole, 'id'>,
	): Promise<UserRole> {
		return this.userRoleRepository.create(userRole);
	}

	@authenticate(STRATEGY.BEARER)
	@authorize(['Read'])
	@get('/user-roles/count', {
		security: OPERATION_SECURITY_SPEC,
		responses: {
			'200': {
				description: 'UserRole model count',
				content: { 'application/json': { schema: CountSchema } },
			},
		},
	})
	async count(
		@param.query.object('where', getWhereSchemaFor(UserRole))
		where?: Where<UserRole>,
	): Promise<Count> {
		return this.userRoleRepository.count(where);
	}

	@authenticate(STRATEGY.BEARER)
	@authorize(['Read'])
	@get('/user-roles', {
		security: OPERATION_SECURITY_SPEC,
		responses: {
			'200': {
				description: 'Array of UserRole model instances',
				content: {
					'application/json': {
						schema: {
							type: 'array',
							items: getModelSchemaRef(UserRole, {
								includeRelations: true,
							}),
						},
					},
				},
			},
		},
	})
	async find(
		@param.query.object('filter', getFilterSchemaFor(UserRole))
		filter?: Filter<UserRole>,
	): Promise<UserRole[]> {
		return this.userRoleRepository.find(filter);
	}

	@authenticate(STRATEGY.BEARER)
	@authorize(['Update'])
	@patch('/user-roles', {
		security: OPERATION_SECURITY_SPEC,
		responses: {
			'200': {
				description: 'UserRole PATCH success count',
				content: { 'application/json': { schema: CountSchema } },
			},
		},
	})
	async updateAll(
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(UserRole, { partial: true }),
				},
			},
		})
		userRole: UserRole,
		@param.query.object('where', getWhereSchemaFor(UserRole))
		where?: Where<UserRole>,
	): Promise<Count> {
		return this.userRoleRepository.updateAll(userRole, where);
	}

	@authenticate(STRATEGY.BEARER)
	@authorize(['Read'])
	@get('/user-roles/{id}', {
		security: OPERATION_SECURITY_SPEC,
		responses: {
			'200': {
				description: 'UserRole model instance',
				content: {
					'application/json': {
						schema: getModelSchemaRef(UserRole, {
							includeRelations: true,
						}),
					},
				},
			},
		},
	})
	async findById(
		@param.path.number('id') id: number,
		@param.query.object('filter', getFilterSchemaFor(UserRole))
		filter?: Filter<UserRole>,
	): Promise<UserRole> {
		return this.userRoleRepository.findById(id, filter);
	}

	@authenticate(STRATEGY.BEARER)
	@authorize(['Update'])
	@patch('/user-roles/{id}', {
		security: OPERATION_SECURITY_SPEC,
		responses: {
			'204': {
				description: 'UserRole PATCH success',
			},
		},
	})
	async updateById(
		@param.path.number('id') id: number,
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(UserRole, { partial: true }),
				},
			},
		})
		userRole: UserRole,
	): Promise<void> {
		await this.userRoleRepository.updateById(id, userRole);
	}

	@authenticate(STRATEGY.BEARER)
	@authorize(['Update'])
	@put('/user-roles/{id}', {
		security: OPERATION_SECURITY_SPEC,
		responses: {
			'204': {
				description: 'UserRole PUT success',
			},
		},
	})
	async replaceById(
		@param.path.number('id') id: number,
		@requestBody() userRole: UserRole,
	): Promise<void> {
		await this.userRoleRepository.replaceById(id, userRole);
	}

	@authenticate(STRATEGY.BEARER)
	@authorize(['Delete'])
	@del('/user-roles/{id}', {
		security: OPERATION_SECURITY_SPEC,
		responses: {
			'204': {
				description: 'UserRole DELETE success',
			},
		},
	})
	async deleteById(@param.path.number('id') id: number): Promise<void> {
		await this.userRoleRepository.deleteById(id);
	}
}
