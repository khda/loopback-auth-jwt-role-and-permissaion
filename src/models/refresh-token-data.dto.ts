import {Entity, model, property} from '@loopback/repository';

@model()
export class RefreshTokenData extends Entity {
  @property({
    type: 'number',
    required: true,
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
