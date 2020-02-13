import {Provider} from '@loopback/context';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {VerifyFunction} from 'loopback4-authentication';
import * as jwt from 'jsonwebtoken';

import {RevokedTokenDataRepository} from '../repositories';
import {User} from '../models';

const JWT_SECRET = 'plmnkoxswqaz';
const JWT_ISSUER = 'lb_api';

export class BearerTokenVerifyProvider
  implements Provider<VerifyFunction.BearerFn> {
  constructor(
    @repository(RevokedTokenDataRepository)
    public revokedTokenDataRepository: RevokedTokenDataRepository,
  ) {}

  value(): VerifyFunction.BearerFn {
    return async accessToken => {
      const revokedTokenData = await this.revokedTokenDataRepository.get(
        accessToken,
      );

      if (accessToken && revokedTokenData) {
        throw new HttpErrors.Unauthorized('TokenIsRevoked');
      }

      const user = jwt.verify(accessToken, JWT_SECRET, {
        issuer: JWT_ISSUER,
      }) as User;

      return user;
    };
  }
}

// curl -X POST "http://localhost:4000/auth/logout" -H "accept: application/json" -H "Authorization: Bearer ..."
