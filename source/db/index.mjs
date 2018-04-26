import path from 'path';
import monitor from 'pg-monitor';
import pgp from 'pg-promise';

import config from '../config';
import dirName from '../dirName';

const initOptions = {};

if (config.logFormat !== 'disabled') {
	monitor.setTheme('invertedMonochrome');
	monitor.attach(initOptions);
}

export const db = pgp(initOptions)(config.databaseUrl);

export const loadQuery = (file) => {
	const fullPath = path.join(dirName(import.meta), '..', file);

	return new pgp.QueryFile(fullPath, {
		debug: true,
		minify: true
	});
};
