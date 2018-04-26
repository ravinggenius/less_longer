/* global URL */

import ConfConf from 'conf_conf';
import dotenv from 'dotenv';

dotenv.config({
	path: new URL(
		`../.env-${process.env.NODE_ENV || 'development'}`,
		import.meta.url
	).pathname
});

const configBoolean = ifUndefined => ({
	filter: _ => _ === 'true',
	ifUndefined,
	set: [ 'true', 'false' ]
});

const configNumber = ifUndefined => ({
	filter: _ => Number.parseInt(_, 10),
	ifUndefined
});

export default ConfConf.configure(process.env, {
	allowMultipleUsers: configBoolean('false'),

	cookieSecret: {
		ifUndefined: 'replace for production'
	},

	databaseUrl: {},

	hashStrength: configNumber('12'),

	jwtSecret: {
		ifUndefined: 'replace for production'
	},

	logFormat: {
		ifUndefined: 'dev'
	},

	nodeEnv: {
		ifUndefined: 'development'
	},

	port: configNumber('3000'),

	title: {
		ifUndefined: 'Less Longer'
	},

	tokenExpirationSeconds: configNumber('3600'),

	useSecureCookies: configBoolean('false')
});
