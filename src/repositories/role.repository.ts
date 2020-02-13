import { DefaultCrudRepository, repository, HasManyRepositoryFactory } from '@loopback/repository';
import { Role, RoleRelations, RolePermission, UserRole } from '../models';
import { FileDbDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { RolePermissionRepository } from './role-permission.repository';
import { UserRoleRepository } from './user-role.repository';

export class RoleRepository extends DefaultCrudRepository<
	Role,
	typeof Role.prototype.id,
	RoleRelations
	> {

	public readonly rolePermissions: HasManyRepositoryFactory<RolePermission, typeof Role.prototype.id>;
	public readonly userRoles: HasManyRepositoryFactory<UserRole, typeof Role.prototype.id>;

	constructor(
		@inject('datasources.fileDb') dataSource: FileDbDataSource,
		@repository.getter('RolePermissionRepository')
		protected rolePermissionRepositoryGetter: Getter<RolePermissionRepository>,
		@repository.getter('UserRoleRepository')
		protected userRoleRepositoryGetter: Getter<UserRoleRepository>,
	) {
		super(Role, dataSource);
		this.userRoles = this.createHasManyRepositoryFactoryFor('userRoles', userRoleRepositoryGetter);
		this.registerInclusionResolver('userRoles', this.userRoles.inclusionResolver);
		this.rolePermissions = this.createHasManyRepositoryFactoryFor('rolePermissions', rolePermissionRepositoryGetter);
		this.registerInclusionResolver('rolePermissions', this.rolePermissions.inclusionResolver);
	}
}
