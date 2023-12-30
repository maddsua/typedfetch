
export interface TypedRouterMethodOptions {
	type?: 'query' | 'mutation';
};

export class TypedRouterMethod<R extends object, S extends object, T extends TypedRouterMethodOptions> {

	opts: TypedRouterMethodOptions;
	handler: (input: R) => Promise<S> | S;

	constructor(handler: (request: R) => Promise<S> | S, opts?: T) {
		this.handler = handler;
		this.opts = opts || { type: 'query' };
	};
};

export const method = <R extends object, S extends object, T extends TypedRouterMethodOptions>(handler: (request: R) => Promise<S> | S, opts?: T) => new TypedRouterMethod(handler, opts);
