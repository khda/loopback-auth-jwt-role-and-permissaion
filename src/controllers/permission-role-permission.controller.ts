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
  RolePermission,
} from '../models';
import {PermissionRepository} from '../repositories';

export class PermissionRolePermissionController {
  constructor(
    @repository(PermissionRepository) protected permissionRepository: PermissionRepository,
  ) { }

  @get('/permissions/{id}/role-permissions', {
    responses: {
      '200': {
        description: 'Array of Permission has many RolePermission',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(RolePermission)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<RolePermission>,
  ): Promise<RolePermission[]> {
    return this.permissionRepository.rolePermissions(id).find(filter);
  }

  @post('/permissions/{id}/role-permissions', {
    responses: {
      '200': {
        description: 'Permission model instance',
        content: {'application/json': {schema: getModelSchemaRef(RolePermission)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Permission.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RolePermission, {
            title: 'NewRolePermissionInPermission',
            exclude: ['id'],
            optional: ['permissionId']
          }),
        },
      },
    }) rolePermission: Omit<RolePermission, 'id'>,
  ): Promise<RolePermission> {
    return this.permissionRepository.rolePermissions(id).create(rolePermission);
  }

  @patch('/permissions/{id}/role-permissions', {
    responses: {
      '200': {
        description: 'Permission.RolePermission PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RolePermission, {partial: true}),
        },
      },
    })
    rolePermission: Partial<RolePermission>,
    @param.query.object('where', getWhereSchemaFor(RolePermission)) where?: Where<RolePermission>,
  ): Promise<Count> {
    return this.permissionRepository.rolePermissions(id).patch(rolePermission, where);
  }

  @del('/permissions/{id}/role-permissions', {
    responses: {
      '200': {
        description: 'Permission.RolePermission DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(RolePermission)) where?: Where<RolePermission>,
  ): Promise<Count> {
    return this.permissionRepository.rolePermissions(id).delete(where);
  }
}
