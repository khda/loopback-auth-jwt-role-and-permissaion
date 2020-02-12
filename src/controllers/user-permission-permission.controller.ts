import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  UserPermission,
  Permission,
} from '../models';
import {UserPermissionRepository} from '../repositories';

export class UserPermissionPermissionController {
  constructor(
    @repository(UserPermissionRepository)
    public userPermissionRepository: UserPermissionRepository,
  ) { }

  @get('/user-permissions/{id}/permission', {
    responses: {
      '200': {
        description: 'Permission belonging to UserPermission',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Permission)},
          },
        },
      },
    },
  })
  async getPermission(
    @param.path.number('id') id: typeof UserPermission.prototype.id,
  ): Promise<Permission> {
    return this.userPermissionRepository.permission(id);
  }
}
