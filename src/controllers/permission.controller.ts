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
import {Permission} from '../models';
import {PermissionRepository} from '../repositories';
import {authenticate, STRATEGY} from 'loopback4-authentication';
import {authorize} from 'loopback4-authorization';
import {OPERATION_SECURITY_SPEC} from '../utils/security-spec';

export class PermissionController {
  constructor(
    @repository(PermissionRepository)
    public permissionRepository: PermissionRepository,
  ) {}

  @authenticate(STRATEGY.BEARER)
  @authorize(['Create'])
  @post('/permissions', {
		security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Permission model instance',
        content: {'application/json': {schema: getModelSchemaRef(Permission)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Permission, {
            title: 'NewPermission',
            exclude: ['id'],
          }),
        },
      },
    })
    permission: Omit<Permission, 'id'>,
  ): Promise<Permission> {
    return this.permissionRepository.create(permission);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize(['Read'])
  @get('/permissions/count', {
		security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Permission model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Permission))
    where?: Where<Permission>,
  ): Promise<Count> {
    return this.permissionRepository.count(where);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize(['Read'])
  @get('/permissions', {
		security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Array of Permission model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Permission, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Permission))
    filter?: Filter<Permission>,
  ): Promise<Permission[]> {
    return this.permissionRepository.find(filter);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize(['Update'])
  @patch('/permissions', {
		security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Permission PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Permission, {partial: true}),
        },
      },
    })
    permission: Permission,
    @param.query.object('where', getWhereSchemaFor(Permission))
    where?: Where<Permission>,
  ): Promise<Count> {
    return this.permissionRepository.updateAll(permission, where);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize(['Read'])
  @get('/permissions/{id}', {
		security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Permission model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Permission, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Permission))
    filter?: Filter<Permission>,
  ): Promise<Permission> {
    return this.permissionRepository.findById(id, filter);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize(['Update'])
  @patch('/permissions/{id}', {
		security: OPERATION_SECURITY_SPEC,
    responses: {
      '204': {
        description: 'Permission PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Permission, {partial: true}),
        },
      },
    })
    permission: Permission,
  ): Promise<void> {
    await this.permissionRepository.updateById(id, permission);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize(['Update'])
  @put('/permissions/{id}', {
		security: OPERATION_SECURITY_SPEC,
    responses: {
      '204': {
        description: 'Permission PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() permission: Permission,
  ): Promise<void> {
    await this.permissionRepository.replaceById(id, permission);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize(['Delete'])
  @del('/permissions/{id}', {
		security: OPERATION_SECURITY_SPEC,
    responses: {
      '204': {
        description: 'Permission DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.permissionRepository.deleteById(id);
  }
}
