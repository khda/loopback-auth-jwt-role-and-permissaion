import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'revoked_token_data',
})
export class RevokedTokenData extends Entity {
  @property({
    type: 'string',
    required: true,
    name: 'access_token',
  })
  accessToken: string;

  constructor(data?: Partial<RevokedTokenData>) {
    super(data);
  }
}

export interface RevokedTokenDataRelations {
  // describe navigational properties here
}

export type RevokedTokenDataWithRelations = RevokedTokenData &
  RevokedTokenDataRelations;
