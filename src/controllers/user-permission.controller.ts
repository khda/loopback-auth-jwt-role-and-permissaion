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

export class UserPermissionController {
  constructor(
    @repository(UserPermissionRepository)
    public userPermissionRepository : UserPermissionRepository,
  ) {}

  @post('/user-permissions', {
    responses: {
      '200': {
        description: 'UserPermission model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserPermission)}},
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

  @get('/user-permissions/count', {
    responses: {
      '200': {
        description: 'UserPermission model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(UserPermission)) where?: Where<UserPermission>,
  ): Promise<Count> {
    return this.userPermissionRepository.count(where);
  }

  @get('/user-permissions', {
    responses: {
      '200': {
        description: 'Array of UserPermission model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(UserPermission, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(UserPermission)) filter?: Filter<UserPermission>,
  ): Promise<UserPermission[]> {
    return this.userPermissionRepository.find(filter);
  }

  @patch('/user-permissions', {
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
    @param.query.object('where', getWhereSchemaFor(UserPermission)) where?: Where<UserPermission>,
  ): Promise<Count> {
    return this.userPermissionRepository.updateAll(userPermission, where);
  }

  @get('/user-permissions/{id}', {
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
    @param.query.object('filter', getFilterSchemaFor(UserPermission)) filter?: Filter<UserPermission>
  ): Promise<UserPermission> {
    return this.userPermissionRepository.findById(id, filter);
  }

  @patch('/user-permissions/{id}', {
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

  @put('/user-permissions/{id}', {
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

  @del('/user-permissions/{id}', {
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
