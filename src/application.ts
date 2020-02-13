import path from 'path';
import { BootMixin } from '@loopback/boot';
import { ApplicationConfig } from '@loopback/core';
import {
	RestExplorerBindings,
	RestExplorerComponent,
} from '@loopback/rest-explorer';
import { RepositoryMixin } from '@loopback/repository';
import { RestApplication } from '@loopback/rest';
import { ServiceMixin } from '@loopback/service-proxy';
import { MySequence } from './sequence';

import {
	AuthorizationComponent,
	AuthorizationBindings,
} from 'loopback4-authorization';
import { AuthenticationComponent, Strategies } from 'loopback4-authentication';
import {
	LocalPasswordVerifyProvider,
	BearerTokenVerifyProvider,
} from './providers';

/**
 *
 */
export class Project1AuthApplication extends BootMixin(
	ServiceMixin(RepositoryMixin(RestApplication)),
) {
	constructor(options: ApplicationConfig = {}) {
		super(options);

		// Set up the custom sequence
		this.sequence(MySequence);

		// Set up default home page
		this.static('/', path.join(__dirname, '../public'));

		// Customize @loopback/rest-explorer configuration here
		this.bind(RestExplorerBindings.CONFIG)
			.to({ path: '/explorer' });
		this.component(RestExplorerComponent);

		// Add authentication component
		this.component(AuthenticationComponent);
		this.bind(Strategies.Passport.LOCAL_PASSWORD_VERIFIER)
			.toProvider(LocalPasswordVerifyProvider);
		this.bind(Strategies.Passport.BEARER_TOKEN_VERIFIER)
			.toProvider(BearerTokenVerifyProvider);

		// Add authorization component
		this.bind(AuthorizationBindings.CONFIG)
			.to({ allowAlwaysPaths: ['/explorer'] });
		this.component(AuthorizationComponent);

		this.projectRoot = __dirname;
		// Customize @loopback/boot Booter Conventions here
		this.bootOptions = {
			controllers: {
				// Customize ControllerBooter Conventions here
				dirs: ['controllers'],
				extensions: ['.controller.js'],
				nested: true,
			},
		};
	}
}
