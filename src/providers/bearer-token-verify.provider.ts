import { Provider } from '@loopback/context';
import { repository } from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';
import { VerifyFunction } from 'loopback4-authentication';
import * as jwt from 'jsonwebtoken';

import { RevokedTokenRepository } from '../repositories';
import { AuthUser } from '../models';

const JWT_SECRET = 'plmnkoxswqaz';
const JWT_ISSUER = 'lb_api';

export class BearerTokenVerifyProvider
	implements Provider<VerifyFunction.BearerFn> {
	constructor(
		@repository(RevokedTokenRepository)
		public revokedTokenRepository: RevokedTokenRepository,
	) { }

	value(): VerifyFunction.BearerFn {
		return async (token) => {
			const isRevokedToken = await this.revokedTokenRepository.get(token);

			if (token && isRevokedToken) {
				throw new HttpErrors.Unauthorized('TokenIsRevoked');
			}

			const authUser = jwt.verify(
				token,
				JWT_SECRET,
				{ issuer: JWT_ISSUER }
			) as AuthUser;

			return authUser;
		};
	}
}

// curl -X GET "http://localhost:4000/books/count" -H "accept: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYW0iLCJwYXNzd29yZCI6IjEyMyIsInByb2ZpbGUiOnsiZmlyc3ROYW1lIjoic3RyaW5nIn0sImFyY2hpdmVkIjpmYWxzZSwicGVybWlzc2lvbklkcyI6WzEsMiwzLDRdLCJyb2xlSWRzIjpbMSwyLDNdLCJpYXQiOjE1ODE0OTUxOTMsImV4cCI6MTU4MTQ5NjA5MywiaXNzIjoibGJfYXBpIn0.LovdaNl8JZec5xoU8YO73dNXL_G2OivGUUHFI4-PlCE"
