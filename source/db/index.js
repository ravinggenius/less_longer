const path = require('path');
const monitor = require('pg-monitor');
const pgp = require('pg-promise');

const config = require('../config');

const initOptions = {};

if (config.logFormat !== 'disabled') {
	monitor.setTheme('invertedMonochrome');
	monitor.attach(initOptions);
}

module.exports = {
	db: pgp(initOptions)(config.databaseUrl),

	loadQuery: (file) => {
		const fullPath = path.join(__dirname, '..', file);

		return new pgp.QueryFile(fullPath, {
			debug: true,
			minify: true
		});
	}
};
