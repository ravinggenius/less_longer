import { configBoolean, configDynamic, configInteger, configString, configure } from 'conf_conf';
import dotenv from 'dotenv';

dotenv.config({
	path: new URL(
		`../${process.env.NODE_ENV || 'development'}.env`,
		import.meta.url
	).pathname
});

export default configure(process.env, {
	allowMultipleUsers: configBoolean('false'),

	baseUrl: configString('http://localhost:3000'),

	cookieSecret: configString('replace for production'),

	databaseUrl: {},

	hashStrength: configInteger('12'),

	isDev: configDynamic(env => env.NODE_ENV !== 'production'),

	jwtSecret: configString('replace for production'),

	nodeEnv: configString('development'),

	passwordMinLength: configInteger('12'),

	port: configInteger('3000'),

	slugCodeMinLength: {
		fallback: '2',
		finalize: _ => {
			const reply = Number.parseInt(_, 10);
			if (reply < 2) {
				throw new Error('`CODE_MIN_LENGTH` must be `2` or greater');
			}
			return reply;
		}
	},

	slugCodePersistence: configInteger('10'),

	slugCodePool: configString('23456789abcdefghijkmnopqrstuvwxyz'),

	title: configString('Less Longer'),

	tokenExpirationSeconds: configInteger('3600'),

	useSecureCookies: configBoolean('false')
});
