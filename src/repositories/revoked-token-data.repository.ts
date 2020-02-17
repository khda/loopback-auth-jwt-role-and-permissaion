import { DefaultKeyValueRepository } from '@loopback/repository';
import { RevokedTokenData } from '../models';
import { RedisDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class RevokedTokenDataRepository extends DefaultKeyValueRepository<
	RevokedTokenData
> {
	constructor(@inject('datasources.redis') dataSource: RedisDataSource) {
		super(RevokedTokenData, dataSource);
	}
}
