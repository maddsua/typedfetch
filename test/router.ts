import { method } from "../v2/router.ts";
import { ServerRouter } from "../v2/server.ts";

const routerMethods = {
	test: method((props: { test: number }) => ({ result: 22 }), {
		type: 'query'
	}),
	check: method(() => ({ live: true }),)
};

const handler = (props: { test: number }) => ({ result: 22 });

const test = method(handler);

type MethodsType = typeof routerMethods;

const router = new ServerRouter(routerMethods, {
	endpoint: new URL('http://test.com/api')
});

type RouterType = typeof router;

const testRequest = new Request('http://test.com/api/check/', {
	headers: {

	}
});

const response = await router.invoke(testRequest);

console.log(response, await response.text());
