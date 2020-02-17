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
import { User, AuthUser, UserRole, UserPermission } from '../models';

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
	) {}

	value(): VerifyFunction.LocalPasswordFn {
		return async (username, password) => {
			const user: User = new User(
				await this.userRepository.verifyPassword(username, password),
			);

			const authUser: AuthUser = new AuthUser(user);

			const userRoles: UserRole[] = await this.userRoleRepository.find({
				where: {
					userId: authUser.id,
				},
			});

			const userPermissions: UserPermission[] = await this.userPermissionRepository.find(
				{
					where: {
						userId: authUser.id,
						allowed: true,
					},
				},
			);

			const roleIds = userRoles.map((userRole) => userRole.roleId);
			const permissionIds = userPermissions.map(
				(userPermission) => userPermission.permissionId,
			);

			authUser.roles = await this.roleRepository.find({
				where: {
					id: {
						inq: roleIds,
					},
				},
			});

			authUser.permissions = await this.permissionRepository.find({
				where: {
					id: {
						inq: permissionIds,
					},
				},
			});

			return authUser;
		};
	}
}
