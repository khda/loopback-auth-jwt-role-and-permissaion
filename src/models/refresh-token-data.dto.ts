import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'refresh_token_data',
})
export class RefreshTokenData extends Entity {
  @property({
    type: 'number',
    required: true,
    name: 'user_id',
  })
  userId: number;

  constructor(data?: Partial<RefreshTokenData>) {
    super(data);
  }
}

export interface RefreshTokenDataRelations {
  // describe navigational properties here
}

export type RefreshTokenDataWithRelations = RefreshTokenData &
  RefreshTokenDataRelations;
