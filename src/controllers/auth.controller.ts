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
	LoginRequest,
	TokenResponse,
	// AuthTokenRequest,
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
		// @inject(AuthenticationBindings.CURRENT_CLIENT)
		// private readonly client: AuthClient | undefined,
		// @inject(AuthenticationBindings.CURRENT_USER)
		// private readonly user: AuthUser | undefined,
		@inject(AuthenticationBindings.CURRENT_USER)
		private readonly user: User | undefined,
		// private readonly user: User | undefined,
		// @inject(AuthorizationBindings.USER_PERMISSIONS)
		// private readonly getUserPermissions: UserPermissionsFn<string>,
		// @repository(AuthClientRepository)
		// public authClientRepository: AuthClientRepository,
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
	) { }

	// @authenticateClient(STRATEGY.CLIENT_PASSWORD)
	// @authenticate(STRATEGY.LOCAL)
	// @authorize(['*'])
	// @post('/auth/login', {
	// 	responses: {
	// 		200: {
	// 			description: 'Auth Code',
	// 			content: {
	// 				'application/json': Object,
	// 			},
	// 		},
	// 	},
	// })
	// async login(@requestBody() req: LoginRequest): Promise<{ code: string }> {
	// 	if (!this.user) {
	// 		throw new HttpErrors.Unauthorized(AuthErrorKeys.ClientInvalid);
	// 	}

	// 	try {
	// 		const token = jwt.sign(
	// 			this.user.toJSON(),
	// 			JWT_SECRET,
	// 			{
	// 				expiresIn: AUTH_CODE_EXPIRATION,
	// 				subject: req.username,
	// 				issuer: JWT_ISSUER,
	// 			}
	// 		);

	// 		return {
	// 			code: token,
	// 		};
	// 	}
	// 	catch (error) {
	// 		throw new HttpErrors.InternalServerError(
	// 			AuthErrorKeys.InvalidCredentials,
	// 		);
	// 	}
	// }

	// @authenticateClient(STRATEGY.CLIENT_PASSWORD)
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
		// if (!this.user) {
		// 	throw new HttpErrors.Unauthorized(AuthErrorKeys.ClientInvalid);
		// }

		return this.createJWT(this.user as User);

		// try {
		// 	const token = jwt.sign(
		// 		this.user.toJSON(),
		// 		JWT_SECRET,
		// 		{
		// 			expiresIn: AUTH_CODE_EXPIRATION,
		// 			subject: req.username,
		// 			issuer: JWT_ISSUER,
		// 		}
		// 	);

		// 	return {
		// 		code: token,
		// 	};
		// }
		// catch (error) {
		// 	throw new HttpErrors.InternalServerError(
		// 		AuthErrorKeys.InvalidCredentials,
		// 	);
		// }

	}

	// /**
	//  *
	//  * @param req
	//  */
	// @authorize(['*'])
	// @post('/auth/token', {
	// 	responses: {
	// 		200: {
	// 			description: 'Token Response',
	// 			content: {
	// 				'application/json': {
	// 					schema: { 'x-ts-type': TokenResponse },
	// 				},
	// 			},
	// 		},
	// 	},
	// })
	// async getToken(@requestBody() req: AuthTokenRequest): Promise<TokenResponse> {
	// 	try {
	// 		const user: User = jwt.verify(
	// 			req.code,
	// 			JWT_SECRET,
	// 			{
	// 				subject: req.username,
	// 				issuer: JWT_ISSUER,
	// 			},
	// 		) as User;

	// 		return await this.createJWT(user);
	// 	}
	// 	catch (error) {
	// 		if (error.name === 'TokenExpiredError') {
	// 			throw new HttpErrors.Unauthorized(AuthErrorKeys.CodeExpired);
	// 		}
	// 		else if (Object.prototype.isPrototypeOf.call(HttpErrors.HttpError, error)) {
	// 			throw error;
	// 		}
	// 		else {
	// 			throw new HttpErrors.Unauthorized(AuthErrorKeys.InvalidCredentials);
	// 		}
	// 	}
	// }

	@authorize(['*'])
	@post('/auth/token-refresh', {
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
		const refreshTokenData: RefreshTokenData =
			await this.refreshTokenRepository.get(req.refreshToken);

		if (!refreshTokenData) {
			throw new HttpErrors.Unauthorized(AuthErrorKeys.TokenExpired);
		}

		// const authClient = await this.authClientRepository.findOne({
		// 	where: {
		// 		clientId: refreshPayload.clientId,
		// 	},
		// });

		// if (!authClient) {
		// 	throw new HttpErrors.Unauthorized(AuthErrorKeys.ClientInvalid);
		// }

		const user: User | undefined =
			await this.userRepository.findById(refreshTokenData.userId);

		if (!user) {
			throw new HttpErrors.Unauthorized('UserDoesNotExist');
		}

		return this.createJWT(user);
	}

	/**
	 *
	 * @param payload
	 * @param authClient
	 */
	private async createJWT(oldUser: User): Promise<TokenResponse> {
		try {
			if (!oldUser || !oldUser.id) {
				throw new HttpErrors.Unauthorized('UserDoesNotExist');
			}

			const user = await this.userRepository.findById(oldUser.id);

			// let user: User | undefined;
			// if (payload.user) {
			// 	user = payload.user;
			// } else if (payload.userId) {
			// 	user = await this.userRepo.findById(payload.userId);
			// }
			if (!user || !user.id) {
				throw new HttpErrors.Unauthorized('UserDoesNotExist');
			}

			if (user.archived) {
				throw new HttpErrors.Unauthorized('UserIsArchived');
			}
			// Create user DTO for payload to JWT
			// const authUser: AuthUser = new AuthUser(user);
			// const role = await this.userRepo.role(user.id);
			// const utPerms = await this.utPermsRepo.find({
			// 	where: {
			// 		userId: user.id,
			// 	},
			// 	fields: {
			// 		permission: true,
			// 		allowed: true,
			// 	},
			// });
			// authUser.permissions = this.getUserPermissions(utPerms, role.permissions);
			// authUser.role = role.roleKey.toString();


			// const authUser: User = new User(user);

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

			const accessToken = jwt.sign(
				user.toJSON(),
				JWT_SECRET,
				{
					expiresIn: ACCESS_TOKEN_EXPIRATION,
					issuer: JWT_ISSUER,
				},
			);

			const refreshToken: string =
				crypto.randomBytes(REFRESH_TOKEN_SIZE).toString('hex');

			const refreshTokenData: RefreshTokenData = new RefreshTokenData({
				userId: user.id,
			});

			await this.refreshTokenRepository.set(
				refreshToken,
				refreshTokenData,
				{ ttl: REFRESH_TOKEN_EXPIRATION * MILLISECOND },
			);
			return new TokenResponse({ accessToken, refreshToken });
		}
		catch (error) {
			if (Object.prototype.isPrototypeOf.call(HttpErrors.HttpError, error)) {
				throw error;
			}
			else {
				throw new HttpErrors.Unauthorized(AuthErrorKeys.InvalidCredentials);
			}
		}
	}

	@authenticate(STRATEGY.BEARER)
	@authorize(['*'])
	@post('auth/logout', {
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
		@param.header.string('Authorization') authorization: string
	): Promise<boolean> {
		try {
			const token = authorization?.replace(/bearer /i, '');

			if (!token) {
				throw new HttpErrors.Unauthorized(AuthErrorKeys.TokenInvalid);
			}

			const revokedTokenData: RevokedTokenData =
				new RevokedTokenData({ token });

			await this.revokedTokenDataRepository.set(token, revokedTokenData);
		}
		catch (error) {
			throw new HttpErrors.InternalServerError(AuthErrorKeys.UnknownError);
		}

		return true;
	}
}
