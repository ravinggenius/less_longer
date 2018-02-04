const { db, loadQuery } = require('../db');

const sql = {
	findByCode: loadQuery('slugs/queries/findByCode.sql')
};

module.exports = {
	loadUrl: (code) => db.one(
		sql.findByCode,
		{ code },
		({ url }) => url
	),
};
