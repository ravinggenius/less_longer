const { db, loadQuery } = require('../db');

const sql = {
	count: loadQuery('users/queries/count.sql'),
	get: loadQuery('users/queries/get.sql')
};

module.exports = {
	count: () => db.one(
		sql.count,
		null,
		({ count }) => Number.parseInt(count, 10)
	)
};
