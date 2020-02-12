import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {UserPermission, UserPermissionRelations, Permission, User} from '../models';
import {FileDbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PermissionRepository} from './permission.repository';
import {UserRepository} from './user.repository';

export class UserPermissionRepository extends DefaultCrudRepository<
  UserPermission,
  typeof UserPermission.prototype.id,
  UserPermissionRelations
> {

  public readonly permission: BelongsToAccessor<Permission, typeof UserPermission.prototype.id>;
  public readonly user: BelongsToAccessor<User, typeof UserPermission.prototype.id>;

  constructor(
		@inject('datasources.fileDb') dataSource: FileDbDataSource,
		@repository.getter('PermissionRepository')
		protected permissionRepositoryGetter: Getter<PermissionRepository>,
		@repository.getter('UserRepository')
		protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(UserPermission, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.permission = this.createBelongsToAccessorFor('permission', permissionRepositoryGetter,);
    this.registerInclusionResolver('permission', this.permission.inclusionResolver);
  }
}
