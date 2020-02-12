import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  RolePermission,
  Role,
} from '../models';
import {RolePermissionRepository} from '../repositories';

export class RolePermissionRoleController {
  constructor(
    @repository(RolePermissionRepository)
    public rolePermissionRepository: RolePermissionRepository,
  ) { }

  @get('/role-permissions/{id}/role', {
    responses: {
      '200': {
        description: 'Role belonging to RolePermission',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Role)},
          },
        },
      },
    },
  })
  async getRole(
    @param.path.number('id') id: typeof RolePermission.prototype.id,
  ): Promise<Role> {
    return this.rolePermissionRepository.role(id);
  }
}
