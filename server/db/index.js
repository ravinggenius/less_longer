import { readdirSync } from 'fs';
import { basename, extname } from 'path';
import monitor from 'pg-monitor';
import pgp from 'pg-promise';

import config from '../config';

const initOptions = {};

if (config.logFormat !== 'disabled') {
	monitor.setTheme('invertedMonochrome');
	monitor.attach(initOptions);
}

const normalize = path => new URL(
	path,
	import.meta.url
).pathname;

export const db = pgp(initOptions)(config.databaseUrl);

export const loadQueries = queryDir => {
	const children = readdirSync(normalize(`../${queryDir}`));

	return children.filter(file => extname(file) === '.sql').map(file => [
		basename(file, '.sql'),
		new pgp.QueryFile(normalize(`../${queryDir}/${file}`), {
			debug: true,
			minify: true
		})
	]).reduce((reply, [ name, query ]) => ({
		...reply,
		[name]: query
	}), {});
};
