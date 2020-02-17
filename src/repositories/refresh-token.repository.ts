import { DefaultKeyValueRepository } from '@loopback/repository';
import { RefreshTokenData } from '../models';
import { RedisDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class RefreshTokenRepository extends DefaultKeyValueRepository<
	RefreshTokenData
> {
	constructor(@inject('datasources.redis') dataSource: RedisDataSource) {
		super(RefreshTokenData, dataSource);
	}
}
