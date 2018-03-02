const { db, loadQuery } = require('../../db');

const sql = {
	findByCode: loadQuery('slugs/model/queries/findByCode.sql'),
	list: loadQuery('slugs/model/queries/list.sql')
};

module.exports = {
	list: () => db.manyOrNone(sql.list),

	loadUrl: (code) => db.one(
		sql.findByCode,
		{ code },
		({ url }) => url
	),
};
