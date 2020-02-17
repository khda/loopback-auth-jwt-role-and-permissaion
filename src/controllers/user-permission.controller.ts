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
import {UserPermission} from '../models';
import {UserPermissionRepository} from '../repositories';
import {authenticate, STRATEGY} from 'loopback4-authentication';
import {authorize} from 'loopback4-authorization';
import {OPERATION_SECURITY_SPEC} from '../utils/security-spec';

export class UserPermissionController {
  constructor(
    @repository(UserPermissionRepository)
    public userPermissionRepository: UserPermissionRepository,
  ) {}

  @authenticate(STRATEGY.BEARER)
  @authorize(['Create'])
  @post('/user-permissions', {
		security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'UserPermission model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(UserPermission)},
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserPermission, {
            title: 'NewUserPermission',
            exclude: ['id'],
          }),
        },
      },
    })
    userPermission: Omit<UserPermission, 'id'>,
  ): Promise<UserPermission> {
    return this.userPermissionRepository.create(userPermission);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize(['Read'])
  @get('/user-permissions/count', {
		security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'UserPermission model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(UserPermission))
    where?: Where<UserPermission>,
  ): Promise<Count> {
    return this.userPermissionRepository.count(where);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize(['Read'])
  @get('/user-permissions', {
		security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Array of UserPermission model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(UserPermission, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(UserPermission))
    filter?: Filter<UserPermission>,
  ): Promise<UserPermission[]> {
    return this.userPermissionRepository.find(filter);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize(['Update'])
  @patch('/user-permissions', {
		security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'UserPermission PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserPermission, {partial: true}),
        },
      },
    })
    userPermission: UserPermission,
    @param.query.object('where', getWhereSchemaFor(UserPermission))
    where?: Where<UserPermission>,
  ): Promise<Count> {
    return this.userPermissionRepository.updateAll(userPermission, where);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize(['Read'])
  @get('/user-permissions/{id}', {
		security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'UserPermission model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(UserPermission, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(UserPermission))
    filter?: Filter<UserPermission>,
  ): Promise<UserPermission> {
    return this.userPermissionRepository.findById(id, filter);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize(['Update'])
  @patch('/user-permissions/{id}', {
		security: OPERATION_SECURITY_SPEC,
    responses: {
      '204': {
        description: 'UserPermission PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserPermission, {partial: true}),
        },
      },
    })
    userPermission: UserPermission,
  ): Promise<void> {
    await this.userPermissionRepository.updateById(id, userPermission);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize(['Update'])
  @put('/user-permissions/{id}', {
		security: OPERATION_SECURITY_SPEC,
    responses: {
      '204': {
        description: 'UserPermission PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() userPermission: UserPermission,
  ): Promise<void> {
    await this.userPermissionRepository.replaceById(id, userPermission);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize(['Delete'])
  @del('/user-permissions/{id}', {
		security: OPERATION_SECURITY_SPEC,
    responses: {
      '204': {
        description: 'UserPermission DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userPermissionRepository.deleteById(id);
  }
}
