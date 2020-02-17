const application = require('./dist');

const DEFAULT_PORT = 4000;

module.exports = application;

if (require.main === module) {
	// Run the application
	const config = {
		rest: {
			port: Number(process.env.PORT || DEFAULT_PORT),
			host: process.env.HOST,
			// The `gracePeriodForClose` provides a graceful close for http/https
			// servers with keep-alive clients. The default value is `Infinity`
			// (don't force-close). If you want to immediately destroy all sockets
			// upon stop, set its value to `0`.
			// See https://www.npmjs.com/package/stoppable
			// 5 seconds
			gracePeriodForClose: 5000,
			openApiSpec: {
				// useful when used with OpenAPI-to-GraphQL to locate your application
				setServersFromRequest: true,
			},
		},
	};
	application.main(config).catch((err) => {
		console.error('Cannot start the application.', err);
		process.exit(1);
	});
}
