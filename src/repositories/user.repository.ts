import {
	DefaultCrudRepository,
	repository,
	// HasManyRepositoryFactory,
	DataObject,
} from '@loopback/repository';
import { User, UserRelations /*, UserRole, UserPermission*/ } from '../models';
import { PgDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { UserRoleRepository } from './user-role.repository';
import { UserPermissionRepository } from './user-permission.repository';

import { HttpErrors } from '@loopback/rest';
import { AuthenticateErrorKeys } from '../constants/error-keys';
// import * as bcrypt from 'bcrypt';
import { AuthErrorKeys } from 'loopback4-authentication';
import { Options } from '@loopback/repository/src/common-types';

/**
 *
 */
export class UserRepository extends DefaultCrudRepository<
	User,
	typeof User.prototype.id,
	UserRelations
> {
	// public readonly userRoles: HasManyRepositoryFactory<
	//   UserRole,
	//   typeof User.prototype.id
	// >;

	// public readonly userPermissions: HasManyRepositoryFactory<
	//   UserPermission,
	//   typeof User.prototype.id
	// >;
	// private readonly saltRounds = 10;

	constructor(
		@inject('datasources.pg') dataSource: PgDataSource,
		@repository.getter('UserRoleRepository')
		protected userRoleRepositoryGetter: Getter<UserRoleRepository>,
		@repository.getter('UserPermissionRepository')
		protected userPermissionRepositoryGetter: Getter<
			UserPermissionRepository
		>,
	) {
		super(User, dataSource);
		// this.userRoles = this.createHasManyRepositoryFactoryFor(
		//   'userRoles',
		//   userRoleRepositoryGetter,
		// );
		// this.registerInclusionResolver(
		//   'userRoles',
		//   this.userRoles.inclusionResolver,
		// );
		// this.userPermissions = this.createHasManyRepositoryFactoryFor(
		//   'userPermissions',
		//   userPermissionRepositoryGetter,
		// );
		// this.registerInclusionResolver(
		//   'userPermissions',
		//   this.userPermissions.inclusionResolver,
		// );
	}

	/**
	 *
	 * @param entity
	 * @param options
	 */
	async create(entity: DataObject<User>, options?: Options): Promise<User> {
		// try {
		// 	// Add temporary password for first time
		// 	entity.password = await bcrypt.hash(
		// 		entity.password,
		// 		this.saltRounds,
		// 	);
		// }
		// catch (err) {
		// 	throw new HttpErrors.UnprocessableEntity('Error while hashing password');
		// }

		return super.create(entity, options);
	}

	/**
	 *
	 * @param username
	 * @param password
	 */
	async verifyPassword(username: string, password: string): Promise<User> {
		const user = await super.findOne({ where: { username } });

		if (!user || user.archived || !user.password) {
			throw new HttpErrors.Unauthorized(
				AuthenticateErrorKeys.UserDoesNotExist,
			);
			// }
			// else if (!(await bcrypt.compare(password, user.password))) {
		} else if (!(password === user.password)) {
			throw new HttpErrors.Unauthorized(AuthErrorKeys.InvalidCredentials);
		}

		return user;
	}

	/**
	 *
	 * @param username
	 * @param password
	 * @param newPassword
	 */
	async updatePassword(
		username: string,
		password: string,
		newPassword: string,
	): Promise<User> {
		const user = await super.findOne({ where: { username } });

		if (!user || user.archived || !user.password) {
			throw new HttpErrors.Unauthorized(
				AuthenticateErrorKeys.UserDoesNotExist,
			);
			// }
			// else if (!(await bcrypt.compare(password, user.password))) {
		} else if (!(password === user.password)) {
			throw new HttpErrors.Unauthorized(AuthErrorKeys.WrongPassword);
			// }
			// else if (await bcrypt.compare(newPassword, user.password)) {
		} else if (!(newPassword === user.password)) {
			throw new HttpErrors.Unauthorized(
				'Password cannot be same as previous password!',
			);
		}

		await super.updateById(user.id, {
			// password: await bcrypt.hash(newPassword, this.saltRounds),
			password: newPassword,
		});

		return user;
	}
}
