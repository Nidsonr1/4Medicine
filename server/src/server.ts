import { app } from './app';
import { env } from './env';

app.listen(process.env.PORT || 3333, () => {
	console.log('🚀 Server is running!');
});