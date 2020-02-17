import {
	DefaultCrudRepository,
	// repository,
	// BelongsToAccessor,
} from '@loopback/repository';
import { UserRole, UserRoleRelations /*, Role, User*/ } from '../models';
import { PgDataSource } from '../datasources';
import { inject /*, Getter*/ } from '@loopback/core';
// import {RoleRepository} from './role.repository';
// import {UserRepository} from './user.repository';

export class UserRoleRepository extends DefaultCrudRepository<
	UserRole,
	typeof UserRole.prototype.id,
	UserRoleRelations
> {
	// public readonly role: BelongsToAccessor<Role, typeof UserRole.prototype.id>;

	// public readonly user: BelongsToAccessor<User, typeof UserRole.prototype.id>;

	constructor(
		@inject('datasources.pg') dataSource: PgDataSource,
		// @repository.getter('RoleRepository')
		// protected roleRepositoryGetter: Getter<RoleRepository>,
		// @repository.getter('UserRepository')
		// protected userRepositoryGetter: Getter<UserRepository>,
	) {
		super(UserRole, dataSource);
		// this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter);
		// this.registerInclusionResolver('user', this.user.inclusionResolver);
		// this.role = this.createBelongsToAccessorFor('role', roleRepositoryGetter);
		// this.registerInclusionResolver('role', this.role.inclusionResolver);
	}
}
