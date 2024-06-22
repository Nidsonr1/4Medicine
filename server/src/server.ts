import { app } from './app';
import { env } from './env';

app.listen(3333, () => {
	console.log(`🚀 Server is running in port ${3333}`);
});