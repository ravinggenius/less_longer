const app = require('./source');
const config = require('./source/config');

app.listen(config.port, () => {
	// eslint-disable-next-line no-console
	console.log(`Less Longer is running on port ${config.port}`);
});
