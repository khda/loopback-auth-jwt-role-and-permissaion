import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor,
} from '@loopback/repository';
import {
  RolePermission,
  RolePermissionRelations,
  Role,
  Permission,
} from '../models';
import {FileDbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {RoleRepository} from './role.repository';
import {PermissionRepository} from './permission.repository';

export class RolePermissionRepository extends DefaultCrudRepository<
  RolePermission,
  typeof RolePermission.prototype.id,
  RolePermissionRelations
> {
  public readonly role: BelongsToAccessor<
    Role,
    typeof RolePermission.prototype.id
  >;

  public readonly permission: BelongsToAccessor<
    Permission,
    typeof RolePermission.prototype.id
  >;

  constructor(
    @inject('datasources.fileDb') dataSource: FileDbDataSource,
    @repository.getter('RoleRepository')
    protected roleRepositoryGetter: Getter<RoleRepository>,
    @repository.getter('PermissionRepository')
    protected permissionRepositoryGetter: Getter<PermissionRepository>,
  ) {
    super(RolePermission, dataSource);
    this.permission = this.createBelongsToAccessorFor(
      'permission',
      permissionRepositoryGetter,
    );
    this.registerInclusionResolver(
      'permission',
      this.permission.inclusionResolver,
    );
    this.role = this.createBelongsToAccessorFor('role', roleRepositoryGetter);
    this.registerInclusionResolver('role', this.role.inclusionResolver);
  }
}
