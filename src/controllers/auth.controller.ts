import { inject } from '@loopback/context';
import { repository } from '@loopback/repository';
import { HttpErrors, param, post, requestBody } from '@loopback/rest';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import {
	authenticate,
	AuthenticationBindings,
	AuthErrorKeys,
	STRATEGY,
} from 'loopback4-authentication';
import { authorize } from 'loopback4-authorization';

import {
	User,
	AuthUser,
	LoginRequest,
	TokenResponse,
	RefreshTokenData,
	RevokedTokenData,
	AuthTokenRefreshRequest,
} from '../models';

import {
	UserRepository,
	UserRoleRepository,
	UserPermissionRepository,
	RoleRepository,
	PermissionRepository,
	RefreshTokenRepository,
	RevokedTokenDataRepository,
} from '../repositories';
import { OPERATION_SECURITY_SPEC } from '../utils/security-spec';

const JWT_SECRET = 'plmnkoxswqaz';
const JWT_ISSUER = 'lb_api';
// const AUTH_CODE_EXPIRATION = 180;
// const AUTH_CODE_EXPIRATION = 86400;
// const ACCESS_TOKEN_EXPIRATION = 900;
const ACCESS_TOKEN_EXPIRATION = 1 * 60 * 15;
// const REFRESH_TOKEN_EXPIRATION = 86400
const REFRESH_TOKEN_EXPIRATION = 1 * 60 * 60 * 2;
const REFRESH_TOKEN_SIZE = 32;
const MILLISECOND = 1000;

/**
 *
 */
export class LoginController {
	constructor(
		@inject(AuthenticationBindings.CURRENT_USER)
		private readonly authUser: AuthUser | undefined,
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
		@repository(RefreshTokenRepository)
		public refreshTokenRepository: RefreshTokenRepository,
		@repository(RevokedTokenDataRepository)
		private readonly revokedTokenDataRepository: RevokedTokenDataRepository,
	) {}

	@authenticate(STRATEGY.LOCAL)
	@authorize(['*'])
	@post('/auth/login', {
		responses: {
			200: {
				description: 'Token Response',
				content: {
					'application/json': {
						schema: { 'x-ts-type': TokenResponse },
					},
				},
			},
		},
	})
	async login(@requestBody() req: LoginRequest): Promise<TokenResponse> {
		return this.createJWT(this.authUser as AuthUser);
	}

	@authenticate(STRATEGY.BEARER)
	@authorize(['*'])
	@post('/auth/token-refresh', {
		security: OPERATION_SECURITY_SPEC,
		responses: {
			200: {
				description: 'Token Response',
				content: {
					'application/json': {
						schema: { 'x-ts-type': TokenResponse },
					},
				},
			},
		},
	})
	async exchangeToken(
		@requestBody() req: AuthTokenRefreshRequest,
	): Promise<TokenResponse> {
		const refreshTokenData: RefreshTokenData = await this.refreshTokenRepository.get(
			req.refreshToken,
		);

		if (!refreshTokenData) {
			throw new HttpErrors.Unauthorized(AuthErrorKeys.TokenExpired);
		}

		const user: User | undefined = await this.userRepository.findById(
			refreshTokenData.userId,
		);

		if (!user) {
			throw new HttpErrors.Unauthorized('UserDoesNotExist');
		}

		return this.createJWT(user as AuthUser);
	}

	/**
	 *
	 * @param payload
	 * @param authClient
	 */
	private async createJWT(oldUser: AuthUser): Promise<TokenResponse> {
		try {
			if (!oldUser || !oldUser.id) {
				throw new HttpErrors.Unauthorized('UserDoesNotExist');
			}

			const user: User = await this.userRepository.findById(oldUser.id);
			const authUser: AuthUser = new AuthUser(user);

			if (!authUser || !authUser.id) {
				throw new HttpErrors.Unauthorized('UserDoesNotExist');
			}

			if (authUser.archived) {
				throw new HttpErrors.Unauthorized('UserIsArchived');
			}

			const userRoles = await this.userRoleRepository.find({
				where: {
					userId: authUser.id,
				},
			});

			const userPermissions = await this.userPermissionRepository.find({
				where: {
					userId: authUser.id,
					allowed: true,
				},
			});

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

			const accessToken = jwt.sign(authUser.toJSON(), JWT_SECRET, {
				expiresIn: ACCESS_TOKEN_EXPIRATION,
				issuer: JWT_ISSUER,
			});

			const refreshToken: string = crypto
				.randomBytes(REFRESH_TOKEN_SIZE)
				.toString('hex');

			const refreshTokenData: RefreshTokenData = new RefreshTokenData({
				userId: authUser.id,
			});

			await this.refreshTokenRepository.set(
				refreshToken,
				refreshTokenData,
				{
					ttl: REFRESH_TOKEN_EXPIRATION * MILLISECOND,
				},
			);
			return new TokenResponse({ accessToken, refreshToken });
		} catch (error) {
			if (
				Object.prototype.isPrototypeOf.call(HttpErrors.HttpError, error)
			) {
				throw error;
			} else {
				throw new HttpErrors.Unauthorized(
					AuthErrorKeys.InvalidCredentials,
				);
			}
		}
	}

	@authenticate(STRATEGY.BEARER)
	@authorize(['*'])
	@post('auth/logout', {
		security: OPERATION_SECURITY_SPEC,
		responses: {
			200: {
				description: 'Logout',
				content: {
					'application/json': {
						schema: { 'x-ts-type': Boolean },
					},
				},
			},
		},
	})
	async logout(
		@param.header.string('Authorization') authorization: string,
	): Promise<boolean> {
		try {
			const accessToken = authorization?.replace(/bearer /i, '');

			if (!accessToken) {
				throw new HttpErrors.Unauthorized(AuthErrorKeys.TokenInvalid);
			}

			const revokedTokenData: RevokedTokenData = new RevokedTokenData({
				accessToken,
			});

			await this.revokedTokenDataRepository.set(
				accessToken,
				revokedTokenData,
			);
		} catch (error) {
			throw new HttpErrors.InternalServerError(
				AuthErrorKeys.UnknownError,
			);
		}

		return true;
	}
}
