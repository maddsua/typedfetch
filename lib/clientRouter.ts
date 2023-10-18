type RouterMethod = (opts: any) => Promise<any>;
type Router = Record<string, RouterMethod>;

const normalizePathname = (pathname: string) => pathname.replace(/[\\\/]+/g, '/');

export class ClientRouter<T extends Router> {

	endpoint: string = '/';
	query: T;

	constructor (endpoint: string) {

		this.endpoint = endpoint;

		this.query = new Proxy({} as T, {

			get(_obj, prop) {

				return async (opts: any) => {

					let remoteReposne: object;
					let remoteURL: URL | undefined;

					try {

						remoteURL = new URL(`${endpoint}/${prop as string}`);
						remoteURL.pathname = normalizePathname(remoteURL.pathname);

						if (remoteURL.hostname === 'localhost')
							remoteURL.hostname = '127.0.0.1';

						const requestResponse = await fetch(remoteURL, opts !== undefined ? {
							method: 'POST',
							headers: {
								'content-type': 'application/json'
							},
							body: JSON.stringify(opts)
						} : undefined);

						remoteReposne = await requestResponse.json();

						if (requestResponse.status !== 200)
							throw new Error(remoteReposne['error_text']);

					} catch (error) {
						throw new Error(`Failed to query "${remoteURL}": ${(error as Error)?.message || error}`);
					}

					return remoteReposne;
				}
			}
		});
	};
};
