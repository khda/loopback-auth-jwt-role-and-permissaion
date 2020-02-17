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
import { Role } from '../models';
import { RoleRepository } from '../repositories';
import { authenticate, STRATEGY } from 'loopback4-authentication';
import { authorize } from 'loopback4-authorization';
import { OPERATION_SECURITY_SPEC } from '../utils/security-spec';

export class RoleController {
	constructor(
		@repository(RoleRepository)
		public roleRepository: RoleRepository,
	) {}

	@authenticate(STRATEGY.BEARER)
	@authorize(['Create'])
	@post('/roles', {
		security: OPERATION_SECURITY_SPEC,
		responses: {
			'200': {
				description: 'Role model instance',
				content: {
					'application/json': { schema: getModelSchemaRef(Role) },
				},
			},
		},
	})
	async create(
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(Role, {
						title: 'NewRole',
						exclude: ['id'],
					}),
				},
			},
		})
		role: Omit<Role, 'id'>,
	): Promise<Role> {
		return this.roleRepository.create(role);
	}

	@authenticate(STRATEGY.BEARER)
	@authorize(['Read'])
	@get('/roles/count', {
		security: OPERATION_SECURITY_SPEC,
		responses: {
			'200': {
				description: 'Role model count',
				content: { 'application/json': { schema: CountSchema } },
			},
		},
	})
	async count(
		@param.query.object('where', getWhereSchemaFor(Role))
		where?: Where<Role>,
	): Promise<Count> {
		return this.roleRepository.count(where);
	}

	@authenticate(STRATEGY.BEARER)
	@authorize(['Read'])
	@get('/roles', {
		security: OPERATION_SECURITY_SPEC,
		responses: {
			'200': {
				description: 'Array of Role model instances',
				content: {
					'application/json': {
						schema: {
							type: 'array',
							items: getModelSchemaRef(Role, {
								includeRelations: true,
							}),
						},
					},
				},
			},
		},
	})
	async find(
		@param.query.object('filter', getFilterSchemaFor(Role))
		filter?: Filter<Role>,
	): Promise<Role[]> {
		return this.roleRepository.find(filter);
	}

	@authenticate(STRATEGY.BEARER)
	@authorize(['Update'])
	@patch('/roles', {
		security: OPERATION_SECURITY_SPEC,
		responses: {
			'200': {
				description: 'Role PATCH success count',
				content: { 'application/json': { schema: CountSchema } },
			},
		},
	})
	async updateAll(
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(Role, { partial: true }),
				},
			},
		})
		role: Role,
		@param.query.object('where', getWhereSchemaFor(Role))
		where?: Where<Role>,
	): Promise<Count> {
		return this.roleRepository.updateAll(role, where);
	}

	@authenticate(STRATEGY.BEARER)
	@authorize(['Read'])
	@get('/roles/{id}', {
		security: OPERATION_SECURITY_SPEC,
		responses: {
			'200': {
				description: 'Role model instance',
				content: {
					'application/json': {
						schema: getModelSchemaRef(Role, {
							includeRelations: true,
						}),
					},
				},
			},
		},
	})
	async findById(
		@param.path.number('id') id: number,
		@param.query.object('filter', getFilterSchemaFor(Role))
		filter?: Filter<Role>,
	): Promise<Role> {
		return this.roleRepository.findById(id, filter);
	}

	@authenticate(STRATEGY.BEARER)
	@authorize(['Update'])
	@patch('/roles/{id}', {
		security: OPERATION_SECURITY_SPEC,
		responses: {
			'204': {
				description: 'Role PATCH success',
			},
		},
	})
	async updateById(
		@param.path.number('id') id: number,
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(Role, { partial: true }),
				},
			},
		})
		role: Role,
	): Promise<void> {
		await this.roleRepository.updateById(id, role);
	}

	@authenticate(STRATEGY.BEARER)
	@authorize(['Update'])
	@put('/roles/{id}', {
		security: OPERATION_SECURITY_SPEC,
		responses: {
			'204': {
				description: 'Role PUT success',
			},
		},
	})
	async replaceById(
		@param.path.number('id') id: number,
		@requestBody() role: Role,
	): Promise<void> {
		await this.roleRepository.replaceById(id, role);
	}

	@authenticate(STRATEGY.BEARER)
	@authorize(['Delete'])
	@del('/roles/{id}', {
		security: OPERATION_SECURITY_SPEC,
		responses: {
			'204': {
				description: 'Role DELETE success',
			},
		},
	})
	async deleteById(@param.path.number('id') id: number): Promise<void> {
		await this.roleRepository.deleteById(id);
	}
}
