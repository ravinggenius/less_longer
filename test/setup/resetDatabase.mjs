import { db } from '../../server/db';

const resetDatabase = async () => {
	await db.none('TRUNCATE TABLE slugs CASCADE');
	await db.none('TRUNCATE TABLE users CASCADE');
};

export default resetDatabase;

