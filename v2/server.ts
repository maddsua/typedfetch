import type { TypedRouterMethod } from "./router.ts";

type BasicTypedRouter = Record<string, TypedRouterMethod<any, any, any>>;

interface RouterOptions {
	endpoint?: `/${string}` | `http://${string}` | `https://${string}` | URL;
};

export class ServerRouter<T extends BasicTypedRouter> {

	router: T;
	endpointPath: string = '/';

	constructor (router: T, opts?: RouterOptions) {

		this.router = Object.fromEntries(Object.entries(router).map(([key, value]) => ([key.toLowerCase(), value]))) as T;

		let pathname: string;
		switch (typeof opts?.endpoint) {

			case 'string': {

				if (opts.endpoint.startsWith('/'))
					pathname = opts.endpoint;
				else if (/^http(s)?\:\/\//.test(opts.endpoint))
					pathname = new URL(opts.endpoint).pathname;
				else throw new Error('Endpoing pathname should start from root (/your_path) or use http scheme')

			} break;

			case 'object': {
				pathname = opts.endpoint.pathname;
			} break;
		
			default: pathname = '/';
		}
		
		this.endpointPath = pathname.endsWith('/') ? pathname : pathname + '/';
	};

	async invoke(request: Request): Promise<Response> {

		const { pathname } = new URL(request.url);
		const procedureName = pathname.slice(this.endpointPath.length + (pathname.endsWith('/') ? 1 : 0));

		const procedureCtx = this.router[procedureName];
		if (!procedureCtx) {
			console.error(`Procedure ${procedureName} not found`);
			return new Response(JSON.stringify({
				error_text: `procedure ${procedureName} not found`
			}), {
				status: 404
			});
		}

		return await procedureCtx.handler(request);
	};

};
