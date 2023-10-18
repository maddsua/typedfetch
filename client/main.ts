import { ClientRouter } from '../lib/clientRouter.ts';
import type { RouterType } from '../router.ts';

const api = new ClientRouter<RouterType>('http://localhost:2000/api/edge');

try {
	const result = await api.query.getGrantprogramMetrics();
	console.log(result);
} catch (error) {
	console.error(error.message);
}
