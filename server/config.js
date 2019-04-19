import ConfConf from 'conf_conf';
import dotenv from 'dotenv';

dotenv.config({
	path: new URL(
		`../${process.env.NODE_ENV || 'development'}.env`,
		import.meta.url
	).pathname
});

const configBoolean = ifUndefined => ({
	filter: _ => _ === 'true',
	ifUndefined,
	set: [ 'true', 'false' ]
});

const configInteger = ifUndefined => ({
	filter: _ => Number.parseInt(_, 10),
	ifUndefined
});

export default ConfConf.configure(process.env, {
	allowMultipleUsers: configBoolean('false'),

	baseUrl: {
		ifUndefined: 'http://localhost:3000'
	},

	cookieSecret: {
		ifUndefined: 'replace for production'
	},

	databaseUrl: {},

	hashStrength: configInteger('12'),

	jwtSecret: {
		ifUndefined: 'replace for production'
	},

	nodeEnv: {
		ifUndefined: 'development'
	},

	port: configInteger('3000'),

	slugCodeMinLength: {
		ifUndefined: '2',
		filter: _ => {
			const reply = Number.parseInt(_, 10);
			if (reply < 2) {
				throw new Error('`CODE_MIN_LENGTH` must be `2` or greater');
			}
			return reply;
		}
	},

	slugCodePersistence: configInteger('10'),

	slugCodePool: {
		ifUndefined: '23456789abcdefghijkmnopqrstuvwxyz'
	},

	title: {
		ifUndefined: 'Less Longer'
	},

	tokenExpirationSeconds: configInteger('3600'),

	useSecureCookies: configBoolean('false')
});
