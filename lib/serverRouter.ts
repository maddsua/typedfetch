
type RouterMethod = (opts: any) => Promise<any>;
type Router = Record<string, RouterMethod>;

const normalizePathname = (pathname: string) => pathname.replace(/[\\\/]+/g, '/');

export class ServerRouter<T extends Router> {
	
	router: T;
	endpointPath: string = '/';

	constructor (router: T, endpointURL: URL) {
		this.router = router;
		this.endpointPath = normalizePathname(endpointURL.pathname);
	};

	async invoke(request: Request): Promise<Response> {

		const { pathname: procedurePathname } = new URL(request.url);

		console.log(procedurePathname, this.endpointPath);

		const requestedProcedure = normalizePathname(procedurePathname).slice(this.endpointPath.length + 1)?.toLowerCase();
		console.log(requestedProcedure);

		const matchedProcedure = Object.keys(this.router).find(item => item.toLowerCase() === requestedProcedure);
		if (!matchedProcedure) return new Response(JSON.stringify({
			error_text: 'procedure was not found'
		}), {
			status: 404
		});

		let result: any = null;

		try {

			const method = this.router[matchedProcedure as keyof typeof this.router];
			const requestPayload = request.method === 'post' ? await request.json() : undefined;
			result = await method(requestPayload);
		
		} catch (error) {

			console.error(error);

			return new Response(JSON.stringify({
				error_text: 'procedure crashed'
			}), {
				status: 500
			});
		}

		return new Response(JSON.stringify(result), {
			status: 200
		});
	}
};
