import config from './config';
import server from './server';

server.listen(config.port, () => {
	// eslint-disable-next-line no-console
	console.log(`Less Longer is running on port ${config.port}`);
});
