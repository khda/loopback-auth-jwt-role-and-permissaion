import {Provider} from '@loopback/context';
import {repository} from '@loopback/repository';
import {VerifyFunction} from 'loopback4-authentication';

import {UserRepository} from '../repositories';
import {User} from '../models';

export class LocalPasswordVerifyProvider
  implements Provider<VerifyFunction.LocalPasswordFn> {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  value(): VerifyFunction.LocalPasswordFn {
    return async (username, password) => {
      const user: User = new User(
        await this.userRepository.verifyPassword(username, password),
      );
      return user;
    };
  }
}
