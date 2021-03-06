import {
	inject,
	lifeCycleObserver,
	LifeCycleObserver,
	ValueOrPromise,
} from '@loopback/core';
import { juggler } from '@loopback/repository';
import config from './pg.datasource.config.json';

@lifeCycleObserver('datasource')
export class PgDataSource extends juggler.DataSource
	implements LifeCycleObserver {
	static dataSourceName = 'pg';

	constructor(
		@inject('datasources.config.pg', { optional: true })
		dsConfig: object = config,
	) {
		// Override data source config from environment variables
		Object.assign(dsConfig, {
			host: process.env.PG_HOST,
			port: process.env.PG_PORT,
			user: process.env.PG_USER,
			password: process.env.PG_PASSWORD,
			database: process.env.PG_DATABASE,
			schema: process.env.PG_SCHEMA,
		});

		super(dsConfig);
	}

	/**
	 * Start the datasource when application is started
	 */
	start(): ValueOrPromise<void> {
		// Add your logic here to be invoked when the application is started
	}

	/**
	 * Disconnect the datasource when application is stopped. This allows the
	 * application to be shut down gracefully.
	 */
	stop(): ValueOrPromise<void> {
		return super.disconnect();
	}
}
