import { app } from './app';
import { env } from './env';

app.listen(process.env.PORT, () => {
	console.log('🚀 Server is running!');
});