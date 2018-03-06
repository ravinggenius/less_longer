const path = require('path');
const pgp = require('pg-promise');

const config = require('../config');

module.exports = {
	db: pgp()(config.databaseUrl),

	loadQuery: (file) => {
		const fullPath = path.join(__dirname, '..', file);

		return new pgp.QueryFile(fullPath, {
			debug: true,
			minify: true
		});
	}
};
