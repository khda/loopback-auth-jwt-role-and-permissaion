import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  User,
  UserPermission,
} from '../models';
import {UserRepository} from '../repositories';

export class UserUserPermissionController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/user-permissions', {
    responses: {
      '200': {
        description: 'Array of User has many UserPermission',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(UserPermission)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<UserPermission>,
  ): Promise<UserPermission[]> {
    return this.userRepository.userPermissions(id).find(filter);
  }

  @post('/users/{id}/user-permissions', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserPermission)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserPermission, {
            title: 'NewUserPermissionInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) userPermission: Omit<UserPermission, 'id'>,
  ): Promise<UserPermission> {
    return this.userRepository.userPermissions(id).create(userPermission);
  }

  @patch('/users/{id}/user-permissions', {
    responses: {
      '200': {
        description: 'User.UserPermission PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserPermission, {partial: true}),
        },
      },
    })
    userPermission: Partial<UserPermission>,
    @param.query.object('where', getWhereSchemaFor(UserPermission)) where?: Where<UserPermission>,
  ): Promise<Count> {
    return this.userRepository.userPermissions(id).patch(userPermission, where);
  }

  @del('/users/{id}/user-permissions', {
    responses: {
      '200': {
        description: 'User.UserPermission DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(UserPermission)) where?: Where<UserPermission>,
  ): Promise<Count> {
    return this.userRepository.userPermissions(id).delete(where);
  }
}
