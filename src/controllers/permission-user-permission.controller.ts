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
  Permission,
  UserPermission,
} from '../models';
import {PermissionRepository} from '../repositories';

export class PermissionUserPermissionController {
  constructor(
    @repository(PermissionRepository) protected permissionRepository: PermissionRepository,
  ) { }

  @get('/permissions/{id}/user-permissions', {
    responses: {
      '200': {
        description: 'Array of Permission has many UserPermission',
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
    return this.permissionRepository.userPermissions(id).find(filter);
  }

  @post('/permissions/{id}/user-permissions', {
    responses: {
      '200': {
        description: 'Permission model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserPermission)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Permission.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserPermission, {
            title: 'NewUserPermissionInPermission',
            exclude: ['id'],
            optional: ['permissionId']
          }),
        },
      },
    }) userPermission: Omit<UserPermission, 'id'>,
  ): Promise<UserPermission> {
    return this.permissionRepository.userPermissions(id).create(userPermission);
  }

  @patch('/permissions/{id}/user-permissions', {
    responses: {
      '200': {
        description: 'Permission.UserPermission PATCH success count',
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
    return this.permissionRepository.userPermissions(id).patch(userPermission, where);
  }

  @del('/permissions/{id}/user-permissions', {
    responses: {
      '200': {
        description: 'Permission.UserPermission DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(UserPermission)) where?: Where<UserPermission>,
  ): Promise<Count> {
    return this.permissionRepository.userPermissions(id).delete(where);
  }
}
