import { db, loadQuery } from '../../db';

const sql = {
	findByCode: loadQuery('slugs/model/queries/findByCode.sql'),
	list: loadQuery('slugs/model/queries/list.sql')
};

export const list = () => db.manyOrNone(sql.list);

export const loadUrl = (code) => db.oneOrNone(
	sql.findByCode,
	{ code },
	slug => slug ? slug.url : null
);
