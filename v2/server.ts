import type { TypedRouterMethod } from "./router.ts";

type BasicTypedRouter = Record<string, TypedRouterMethod<any, any, any>>;

interface RouterOptions {
	endpoint?: string | URL;
};

export class ServerRouter<T extends BasicTypedRouter> {

	router: T;
	endpointPath: string = '/';

	constructor (router: T, endpointURL: URL) {
		this.router = router;
		this.endpointPath = endpointURL.pathname;
	};

};

