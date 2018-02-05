const { configure } = require('conf_conf');
const { config } = require('dotenv');

config({
	path: `${__dirname}/.env-${process.env.NODE_ENV || 'development'}`
});

module.exports = configure(process.env, {
	allowMultipleUsers: {
		filter: _ => _ === 'true',
		ifUndefined: 'false'
	},

	databaseUrl: {},

	hashStrength: {
		filter: _ => Number.parseInt(_, 10),
		ifUndefined: 12
	},

	logFormat: {
		ifUndefined: (process.env.NODE_ENV === 'production') ? 'combined' : 'dev'
	},

	nodeEnv: { ifUndefined: 'development' },

	port: {
		filter: _ => Number.parseInt(_, 10),
		ifUndefined: '3000'
	},

	sessionSecret: {
		ifUndefined: 'replace for production'
	}
});
