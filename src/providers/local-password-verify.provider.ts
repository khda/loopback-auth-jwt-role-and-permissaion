import { Provider } from '@loopback/context';
import { repository } from '@loopback/repository';
import { VerifyFunction } from 'loopback4-authentication';

import {
	UserRepository,
	UserRoleRepository,
	UserPermissionRepository,
	RoleRepository,
	PermissionRepository,
} from '../repositories';
import { User } from '../models';

export class LocalPasswordVerifyProvider
	implements Provider<VerifyFunction.LocalPasswordFn> {
	constructor(
		@repository(UserRepository)
		public userRepository: UserRepository,
		@repository(UserRoleRepository)
		public userRoleRepository: UserRoleRepository,
		@repository(UserPermissionRepository)
		public userPermissionRepository: UserPermissionRepository,
		@repository(RoleRepository)
		public roleRepository: RoleRepository,
		@repository(PermissionRepository)
		public permissionRepository: PermissionRepository,
	) { }

	value(): VerifyFunction.LocalPasswordFn {
		return async (username, password) => {
			const user: User = new User(
				await this.userRepository.verifyPassword(username, password),
			);

			const userRoles = await this.userRoleRepository.find({
				where: {
					userId: user.id,
				}
			});

			const userPermissions = await this.userPermissionRepository.find({
				where: {
					userId: user.id,
					allowed: true,
				}
			});

			const roleIds = userRoles
				.map((userRole) => userRole.roleId);
			const permissionIds = userPermissions
				.map((userPermission) => userPermission.permissionId);

			user.roles = await this.roleRepository.find({
				where: {
					id: {
						inq: roleIds
					}
				}
			});

			user.permissions = await this.permissionRepository.find({
				where: {
					id: {
						inq: permissionIds
					}
				}
			});

			return user;
		};
	}
}
