import type { RouterType, TypedRouterMethodOptions } from "./router.ts";


export class ClientRouter<T extends RouterType<any, any, TypedRouterMethodOptions>> {

	endpoint: string = '/';
	query: { [K in keyof T]: T[K] extends { type: 'mutation' } ? never : T[K]['handler'] };
	mutate: { [K in keyof T]: T[K] extends { type: 'mutation' } ? T[K]['handler'] : never };

	constructor (endpoint: string) {
		this.endpoint = endpoint;
		this.query = {} as any;
		this.mutate = {} as any;
	}
};
