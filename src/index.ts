import { Project1AuthApplication } from './application';
import { ApplicationConfig } from '@loopback/core';

export { Project1AuthApplication };

export async function main(options: ApplicationConfig = {}) {
	const app = new Project1AuthApplication(options);
	await app.boot();
	await app.start();

	const { url } = app.restServer;
	console.log(`Server is running at ${url}`);
	console.log(`Try ${url}/ping`);

	return app;
}
