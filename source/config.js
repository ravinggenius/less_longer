const { configure } = require('conf_conf');
const { config } = require('dotenv');
const path = require('path');

config({
	path: path.join(__dirname, '..', `.env-${process.env.NODE_ENV || 'development'}`)
});

module.exports = configure(process.env, {
	allowMultipleUsers: {
		filter: _ => _ === 'true',
		ifUndefined: 'false'
	},

	databaseUrl: {},

	hashStrength: {
		filter: _ => Number.parseInt(_, 10),
		ifUndefined: '12'
	},

	jwtSecret: {
		ifUndefined: 'replace for production'
	},

	logFormat: { ifUndefined: 'dev' },

	nodeEnv: { ifUndefined: 'development' },

	port: {
		filter: _ => Number.parseInt(_, 10),
		ifUndefined: '3000'
	},

	title: {
		ifUndefined: 'Less Longer'
	}
});
