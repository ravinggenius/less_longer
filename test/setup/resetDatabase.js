const { db } = require('../../source/db');

const resetDatabase = async () => {
	await db.none('TRUNCATE TABLE slugs CASCADE');
	await db.none('TRUNCATE TABLE users CASCADE');
};

module.exports = resetDatabase;

