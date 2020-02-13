import {repository} from '@loopback/repository';
import {param, get, getModelSchemaRef} from '@loopback/rest';
import {RolePermission, Permission} from '../models';
import {RolePermissionRepository} from '../repositories';

export class RolePermissionPermissionController {
  constructor(
    @repository(RolePermissionRepository)
    public rolePermissionRepository: RolePermissionRepository,
  ) {}

  @get('/role-permissions/{id}/permission', {
    responses: {
      '200': {
        description: 'Permission belonging to RolePermission',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Permission)},
          },
        },
      },
    },
  })
  async getPermission(
    @param.path.number('id') id: typeof RolePermission.prototype.id,
  ): Promise<Permission> {
    return this.rolePermissionRepository.permission(id);
  }
}
