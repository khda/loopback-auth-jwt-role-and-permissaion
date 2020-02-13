import { inject } from '@loopback/context';
import {
	FindRoute,
	HttpErrors,
	InvokeMethod,
	ParseParams,
	Reject,
	RequestContext,
	RestBindings,
	Send,
	SequenceHandler,
} from '@loopback/rest';

import {
	AuthenticateFn,
	AuthenticationBindings,
} from 'loopback4-authentication';
import {
	AuthorizationBindings,
	AuthorizeErrorKeys,
	AuthorizeFn,
	// UserPermissionsFn,
} from 'loopback4-authorization';
// import {AuthClient, AuthUser, User} from './models';
import { User/*, AuthUser*/ } from './models';

const SequenceActions = RestBindings.SequenceActions;

export class MySequence implements SequenceHandler {
	constructor(
		@inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
		@inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
		@inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
		@inject(SequenceActions.SEND) public send: Send,
		@inject(SequenceActions.REJECT) public reject: Reject,

		@inject(AuthenticationBindings.USER_AUTH_ACTION)
		protected authenticateRequest: AuthenticateFn<User>,
		// protected authenticateRequest: AuthenticateFn<AuthUser>,

		// @inject(AuthenticationBindings.USER_AUTH_ACTION)
		// protected authenticateRequest: AuthenticateFn<AuthUser>,
		// @inject(AuthenticationBindings.CLIENT_AUTH_ACTION)
		// protected authenticateRequestClient: AuthenticateFn<AuthClient>,
		@inject(AuthorizationBindings.AUTHORIZE_ACTION)
		protected checkAuthorisation: AuthorizeFn,
		// @inject(AuthorizationBindings.USER_PERMISSIONS)
		// private readonly getUserPermissions: UserPermissionsFn<string>,
	) { }

	async handle(context: RequestContext) {
		try {
			const { request, response } = context;
			const route = this.findRoute(request);
			const args = await this.parseParams(request, route);

			request.body = args[args.length - 1];
			const user: User = await this.authenticateRequest(request);
			// console.log(user);

			const userPermissionNames = user?.permissions
				? user.permissions.map((permission) => permission.name)
				: [];

			const isAccessAllowed: boolean = await this.checkAuthorisation(
				userPermissionNames,
				request,
			);

			if (user && !isAccessAllowed) {
				throw new HttpErrors.Forbidden(AuthorizeErrorKeys.NotAllowedAccess);
			}

			const result = await this.invoke(route, args);
			this.send(response, result);
		} catch (err) {
			this.reject(context, err);
		}
	}
}
