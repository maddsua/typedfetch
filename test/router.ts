import { method } from "../v2/router.ts";
import { ServerRouter } from "../v2/server.ts";

const routerMethods = {
	test: method((props: { test: number }) => ({ result: 22 }), {
		type: 'query'
	})
};

const handler = (props: { test: number }) => ({ result: 22 });

const test = method(handler);

type MethodsType = typeof routerMethods;

const bigRouter = new ServerRouter(routerMethods, {
	endpoint: new URL('http://test.com')
});

type RouterType = typeof bigRouter;
