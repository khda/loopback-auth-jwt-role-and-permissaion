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
import {Role, RolePermission} from '../models';
import {RoleRepository} from '../repositories';

export class RoleRolePermissionController {
  constructor(
    @repository(RoleRepository) protected roleRepository: RoleRepository,
  ) {}

  @get('/roles/{id}/role-permissions', {
    responses: {
      '200': {
        description: 'Array of Role has many RolePermission',
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
    return this.roleRepository.rolePermissions(id).find(filter);
  }

  @post('/roles/{id}/role-permissions', {
    responses: {
      '200': {
        description: 'Role model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(RolePermission)},
        },
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Role.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RolePermission, {
            title: 'NewRolePermissionInRole',
            exclude: ['id'],
            optional: ['roleId'],
          }),
        },
      },
    })
    rolePermission: Omit<RolePermission, 'id'>,
  ): Promise<RolePermission> {
    return this.roleRepository.rolePermissions(id).create(rolePermission);
  }

  @patch('/roles/{id}/role-permissions', {
    responses: {
      '200': {
        description: 'Role.RolePermission PATCH success count',
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
    @param.query.object('where', getWhereSchemaFor(RolePermission))
    where?: Where<RolePermission>,
  ): Promise<Count> {
    return this.roleRepository.rolePermissions(id).patch(rolePermission, where);
  }

  @del('/roles/{id}/role-permissions', {
    responses: {
      '200': {
        description: 'Role.RolePermission DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(RolePermission))
    where?: Where<RolePermission>,
  ): Promise<Count> {
    return this.roleRepository.rolePermissions(id).delete(where);
  }
}
