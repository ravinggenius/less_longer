import { db } from '../../source/db';

const resetDatabase = async () => {
	await db.none('TRUNCATE TABLE slugs CASCADE');
	await db.none('TRUNCATE TABLE users CASCADE');
};

export default resetDatabase;

