import type { RouterType, TypedRouterMethodOptions } from "./router.ts";


export class ClientRouter<T extends RouterType<any, any, TypedRouterMethodOptions>> {

	endpoint: string = '/';
	query: { [K in keyof T]: T[K]['opts']['type'] extends 'mutation' ? T[K]['opts']['type'] : T[K]['handler'] };
	mutate: { [K in keyof T]: T[K]['opts']['type'] extends 'mutation' ? T[K]['handler'] : never };

	constructor (endpoint: string) {
		this.endpoint = endpoint;
		this.query = {} as any;
		this.mutate = {} as any;
	}
};

/*
type A = 'Test';
type B = 'Test';
type C = 'test';

type Res = C extends A ? 'true' : 'false';
*/