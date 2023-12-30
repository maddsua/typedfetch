
export interface TypedRouterMethodOptions {
	type?: 'query' | 'mutation';
};

export class TypedRouterMethod<R extends object, S extends object, T extends TypedRouterMethodOptions> {

	opts: T;
	handler: (input: R) => Promise<S> | S;

	constructor(handler: (input: R) => Promise<S> | S, opts?: T) {
		this.handler = handler;
		this.opts = opts || { type: 'query' } as T;
	};
};

export const method = <R extends object, S extends object, T extends TypedRouterMethodOptions>(handler: (input: R) => Promise<S> | S, opts?: T) => new TypedRouterMethod(handler, opts);

export type RouterType<R extends object, S extends object, T extends TypedRouterMethodOptions> = Record<string, TypedRouterMethod<R, S, T>>;
