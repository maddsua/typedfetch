/*
export type TypedRouterMethod = (opts: object) => Promise<object>;

export interface TypedRouterRoute {

};

export type TypedRouter = Record<string, TypedRouterRoute>;*/

interface TypedRouterMethodOptions {
	type?: 'query' | 'mut';
};

class TypedRouterMethod<R, S, T extends TypedRouterMethodOptions> {

	opts: TypedRouterMethodOptions;
	handler: (request: R) => Promise<S> | S;

	constructor(handler: (request: R) => Promise<S> | S, opts?: T) {
		this.handler = handler;
		this.opts = opts || { type: 'query' };
	};
};

const handler = (props: { test: number }) => 22;

const test = new TypedRouterMethod(handler);
