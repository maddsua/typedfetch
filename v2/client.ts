import type { RouterType, TypedRouterMethodOptions } from "./router.ts";


export class ClientRouter<T extends RouterType<any, any, TypedRouterMethodOptions>> {

	endpoint: string = '/';
	query: T;
	mutate: T;

	constructor (endpoint: string) {
		this.endpoint = endpoint;
		this.query = {} as T;
		this.mutate = {} as T;
	}
};
