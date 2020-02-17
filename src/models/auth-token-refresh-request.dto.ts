import {Model, model, property} from '@loopback/repository';

@model({
  name: 'auth_token_refresh_request',
})
export class AuthTokenRefreshRequest extends Model {
  @property({
    type: 'string',
    required: true,
    name: 'refresh_token',
  })
  refreshToken: string;

  constructor(data?: Partial<AuthTokenRefreshRequest>) {
    super(data);
  }
}

export interface AuthTokenRefreshRequestRelations {
  // describe navigational properties here
}

export type AuthTokenRefreshRequestWithRelations = AuthTokenRefreshRequest &
  AuthTokenRefreshRequestRelations;
