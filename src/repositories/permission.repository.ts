import {
	DefaultCrudRepository,
	// repository,
	// HasManyRepositoryFactory,
} from '@loopback/repository';
import {
	Permission,
	PermissionRelations,
	// RolePermission,
	// UserPermission,
} from '../models';
import { PgDataSource } from '../datasources';
import { inject /*, Getter*/ } from '@loopback/core';
// import {RolePermissionRepository} from './role-permission.repository';
// import {UserPermissionRepository} from './user-permission.repository';

export class PermissionRepository extends DefaultCrudRepository<
	Permission,
	typeof Permission.prototype.id,
	PermissionRelations
> {
	// public readonly rolePermissions: HasManyRepositoryFactory<
	//   RolePermission,
	//   typeof Permission.prototype.id
	// >;

	// public readonly userPermissions: HasManyRepositoryFactory<
	//   UserPermission,
	//   typeof Permission.prototype.id
	// >;

	constructor(
		@inject('datasources.pg') dataSource: PgDataSource,
		// @repository.getter('RolePermissionRepository')
		// protected rolePermissionRepositoryGetter: Getter<RolePermissionRepository>,
		// @repository.getter('UserPermissionRepository')
		// protected userPermissionRepositoryGetter: Getter<UserPermissionRepository>,
	) {
		super(Permission, dataSource);
		// this.userPermissions = this.createHasManyRepositoryFactoryFor(
		//   'userPermissions',
		//   userPermissionRepositoryGetter,
		// );
		// this.registerInclusionResolver(
		//   'userPermissions',
		//   this.userPermissions.inclusionResolver,
		// );
		// this.rolePermissions = this.createHasManyRepositoryFactoryFor(
		//   'rolePermissions',
		//   rolePermissionRepositoryGetter,
		// );
		// this.registerInclusionResolver(
		//   'rolePermissions',
		//   this.rolePermissions.inclusionResolver,
		// );
	}
}
