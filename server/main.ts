import { router } from '../router.ts';

import { ServerRouter } from '../lib/serverRouter.ts';
const server = new ServerRouter(router, new URL('https:/localhost/api/edge'));

const port = 2000;

const handler = async (request: Request) => {
	console.log(request.method, request.url);
	return await server.invoke(request);
};

console.log(`HTTP server running. Access it at: http://localhost:2000/`);
Deno.serve({ port }, handler);
