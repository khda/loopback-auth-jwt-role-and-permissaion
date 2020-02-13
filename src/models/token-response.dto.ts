import {Model, model, property} from '@loopback/repository';

@model()
export class TokenResponse extends Model {
  @property({
    type: 'string',
    required: true,
  })
  accessToken: string;

  @property({
    type: 'string',
    required: true,
  })
  refreshToken: string;

  constructor(data?: Partial<TokenResponse>) {
    super(data);
  }
}

export interface TokenResponseRelations {
  // describe navigational properties here
}

export type TokenResponseWithRelations = TokenResponse & TokenResponseRelations;
