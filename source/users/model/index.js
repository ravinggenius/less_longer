const { db, loadQuery } = require('../../db');

const sql = {
	count: loadQuery('users/model/queries/count.sql'),
	get: loadQuery('users/model/queries/get.sql')
};

module.exports = {
	count: () => db.one(
		sql.count,
		null,
		({ count }) => Number.parseInt(count, 10)
	)
};
