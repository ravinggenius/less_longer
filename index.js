const config = require('./config');
const app = require('./source');

app.listen(config.port, () => {
	// eslint-disable-next-line no-console
	console.log(`Less Longer is running on port ${config.port}`);
});
