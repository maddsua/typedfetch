
interface TypedRouterMethodOptions {
	type?: 'query' | 'mutation';
};

class TypedRouterMethod<R extends object, S extends object, T extends TypedRouterMethodOptions> {

	opts: TypedRouterMethodOptions;
	handler: (request: R) => Promise<S> | S;

	constructor(handler: (request: R) => Promise<S> | S, opts?: T) {
		this.handler = handler;
		this.opts = opts || { type: 'query' };
	};
};

const router = {
	test: new TypedRouterMethod((props: { test: number }) => ({ result: 22 }), {
		type: 'query'
	})
};

const handler = (props: { test: number }) => ({ result: 22 });

const test = new TypedRouterMethod(handler);

type Router = typeof router;
