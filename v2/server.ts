import type { TypedRouterMethod } from "./router.ts";

type BasicTypedRouter = Record<string, TypedRouterMethod<any, any, any>>;

interface RouterOptions {
	endpoint?: string | URL;
};

export class ServerRouter<T extends BasicTypedRouter> {

	router: T;
	endpointPath: string = '/';

	constructor (router: T, opts?: RouterOptions) {

		this.router = router;

		let pathname: string;
		switch (typeof opts?.endpoint) {

			case 'string': {

				if (/^http(s)?\:\/\//.test(opts.endpoint)) {
					pathname = new URL(opts.endpoint).pathname;
				} else {
					pathname = (opts.endpoint.startsWith('/') ? opts.endpoint : '/' + opts.endpoint);
				}

			} break;

			case 'object': {
				pathname = opts.endpoint.pathname;
			} break;
		
			default: pathname = '/';
		}
		
		this.endpointPath = (pathname.endsWith('/') ? pathname : pathname + '/').replace(/[\\\/]+/g, '/');
	};

};
