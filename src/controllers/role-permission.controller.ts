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
import {RolePermission} from '../models';
import {RolePermissionRepository} from '../repositories';
import {authenticate, STRATEGY} from 'loopback4-authentication';
import {authorize} from 'loopback4-authorization';
import {OPERATION_SECURITY_SPEC} from '../utils/security-spec';

export class RolePermissionController {
  constructor(
    @repository(RolePermissionRepository)
    public rolePermissionRepository: RolePermissionRepository,
  ) {}

  @authenticate(STRATEGY.BEARER)
  @authorize(['Create'])
  @post('/role-permissions', {
		security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'RolePermission model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(RolePermission)},
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RolePermission, {
            title: 'NewRolePermission',
            exclude: ['id'],
          }),
        },
      },
    })
    rolePermission: Omit<RolePermission, 'id'>,
  ): Promise<RolePermission> {
    return this.rolePermissionRepository.create(rolePermission);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize(['Read'])
  @get('/role-permissions/count', {
		security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'RolePermission model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(RolePermission))
    where?: Where<RolePermission>,
  ): Promise<Count> {
    return this.rolePermissionRepository.count(where);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize(['Read'])
  @get('/role-permissions', {
		security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Array of RolePermission model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(RolePermission, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(RolePermission))
    filter?: Filter<RolePermission>,
  ): Promise<RolePermission[]> {
    return this.rolePermissionRepository.find(filter);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize(['Update'])
  @patch('/role-permissions', {
		security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'RolePermission PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RolePermission, {partial: true}),
        },
      },
    })
    rolePermission: RolePermission,
    @param.query.object('where', getWhereSchemaFor(RolePermission))
    where?: Where<RolePermission>,
  ): Promise<Count> {
    return this.rolePermissionRepository.updateAll(rolePermission, where);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize(['Read'])
  @get('/role-permissions/{id}', {
		security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'RolePermission model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(RolePermission, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(RolePermission))
    filter?: Filter<RolePermission>,
  ): Promise<RolePermission> {
    return this.rolePermissionRepository.findById(id, filter);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize(['Update'])
  @patch('/role-permissions/{id}', {
		security: OPERATION_SECURITY_SPEC,
    responses: {
      '204': {
        description: 'RolePermission PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RolePermission, {partial: true}),
        },
      },
    })
    rolePermission: RolePermission,
  ): Promise<void> {
    await this.rolePermissionRepository.updateById(id, rolePermission);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize(['Update'])
  @put('/role-permissions/{id}', {
		security: OPERATION_SECURITY_SPEC,
    responses: {
      '204': {
        description: 'RolePermission PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() rolePermission: RolePermission,
  ): Promise<void> {
    await this.rolePermissionRepository.replaceById(id, rolePermission);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize(['Delete'])
  @del('/role-permissions/{id}', {
		security: OPERATION_SECURITY_SPEC,
    responses: {
      '204': {
        description: 'RolePermission DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.rolePermissionRepository.deleteById(id);
  }
}
