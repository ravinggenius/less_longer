const bcrypt = require('bcryptjs');

const config = require('../../config');
const { db, loadQuery } = require('../../db');

const sql = {
	count: loadQuery('users/model/queries/count.sql'),
	create: loadQuery('users/model/queries/create.sql'),
	get: loadQuery('users/model/queries/get.sql')
};

module.exports = {
	count: () => db.one(
		sql.count,
		null,
		({ count }) => Number.parseInt(count, 10)
	),

	create: async (username, password) => {
		const salt = await bcrypt.genSalt(config.hashStrength);
		const hashword = await bcrypt.hash(password, salt);

		return db.one(
			sql.create,
			{ username, hashword },
			({ id }) => id
		);
	}
};
