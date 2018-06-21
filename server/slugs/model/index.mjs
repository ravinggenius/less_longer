import { db, loadQueries } from '../../db';

const sql = loadQueries('slugs/model/queries');

export const list = () => db.manyOrNone(sql.list);

export const create = (userId, code, url) => db.oneOrNone(
	sql.create,
	{ userId, code, url }
);

export const get = (code) => db.oneOrNone(
	sql.findByCode,
	{ code }
);

export const loadUrl = (code) => db.oneOrNone(
	sql.findByCode,
	{ code },
	slug => slug ? slug.url : null
);
