import type { RouterType } from "./router.ts";


export class ClientRouter<T extends RouterType<any, any, any>> {

	endpoint: string;
	query: { [K in keyof T]: T[K]['opts']['type'] extends 'mutation' ? never : T[K]['handler'] };
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