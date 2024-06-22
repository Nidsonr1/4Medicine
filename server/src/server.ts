import { app } from './app';
import { env } from './env';

app.listen(env.API_PORT || 3333, () => {
	console.log(`🚀 Server is running in port ${env.API_PORT || 3333}`);
});