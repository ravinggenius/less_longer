/* global URL */

import monitor from 'pg-monitor';
import pgp from 'pg-promise';

import config from '../config';

const initOptions = {};

if (config.logFormat !== 'disabled') {
	monitor.setTheme('invertedMonochrome');
	monitor.attach(initOptions);
}

export const db = pgp(initOptions)(config.databaseUrl);

export const loadQuery = (file) =>  new pgp.QueryFile(new URL(
	`../${file}`,
	import.meta.url
).pathname, {
	debug: true,
	minify: true
});
