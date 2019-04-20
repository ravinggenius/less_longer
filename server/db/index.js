import { readdirSync } from 'fs';
import { basename, extname } from 'path';
import monitor from 'pg-monitor';
import pgp from 'pg-promise';

import config from '../config';
import rootLogger from '../logger';

const logger = rootLogger.child({
	namespace: 'server:database'
});

monitor.setLog((message, info) => {
	const { event, text, ctx } = info;

	switch (event) {
		case 'connect':
			logger.trace({ event, text, ctx }, message);
			break;
		case 'disconnect':
			logger.trace({ event, text, ctx }, message);
			break;
		case 'query':
			logger.debug({ event, text, ctx }, message);
			break;
		default:
			logger.debug({ event, text, ctx }, message);
			break;
	}

	info.display = false;
});

const initOptions = {
	capSQL: true
};

monitor.attach(initOptions);

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
