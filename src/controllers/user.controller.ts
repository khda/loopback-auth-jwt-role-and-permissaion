import {Getter, inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
	requestBody,
	HttpErrors
} from '@loopback/rest';
import {User, AuthUser} from '../models';
import {UserRepository} from '../repositories';
import {authenticate, STRATEGY, AuthenticationBindings, AuthErrorKeys} from 'loopback4-authentication';
import {authorize} from 'loopback4-authorization';
import {OPERATION_SECURITY_SPEC} from '../utils/security-spec';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject.getter(AuthenticationBindings.CURRENT_USER)
    protected readonly getCurrentUser: Getter<AuthUser | undefined>,
  ) {}

  @authenticate(STRATEGY.BEARER)
  @authorize(['*'])
  @get('/users/me', {
		security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'The current user',
        content: {
          'application/json': {
            schema: AuthUser,
          },
        },
      },
    },
  })
  async currentUser(): Promise<AuthUser> {
    const currentUser = await this.getCurrentUser();

		if (!currentUser) {
      throw new HttpErrors.Forbidden(AuthErrorKeys.InvalidCredentials);
		}

		delete currentUser.password;

    return currentUser;
	}

  @authenticate(STRATEGY.BEARER)
  @authorize(['Create'])
  @post('/users', {
		security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['id'],
          }),
        },
      },
    })
    user: Omit<User, 'id'>,
  ): Promise<User> {
    return this.userRepository.create(user);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize(['Read'])
  @get('/users/count', {
		security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'User model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.count(where);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize(['Read'])
  @get('/users', {
		security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Array of User model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(User, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(User))
    filter?: Filter<User>,
  ): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize(['Update'])
  @patch('/users', {
		security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'User PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.updateAll(user, where);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize(['Read'])
  @get('/users/{id}', {
		security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'User model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(User))
    filter?: Filter<User>,
  ): Promise<User> {
    return this.userRepository.findById(id, filter);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize(['Update'])
  @patch('/users/{id}', {
		security: OPERATION_SECURITY_SPEC,
    responses: {
      '204': {
        description: 'User PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize(['Update'])
  @put('/users/{id}', {
		security: OPERATION_SECURITY_SPEC,
    responses: {
      '204': {
        description: 'User PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize(['Delete'])
  @del('/users/{id}', {
		security: OPERATION_SECURITY_SPEC,
    responses: {
      '204': {
        description: 'User DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
