import { method } from "../v2/router.ts";

const router = {
	test: method((props: { test: number }) => ({ result: 22 }), {
		type: 'query'
	})
};

const handler = (props: { test: number }) => ({ result: 22 });

const test = method(handler);

type Router = typeof router;
