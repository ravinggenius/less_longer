import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import listRoutes from 'express-list-endpoints';
import helmet from 'helmet';
import nextjs from 'next';

import config from './config';
import expanderRoutes from './routes/expander';
import rootLogger from './logger';
import roarr from './logger/middleware'
import loginRoutes from './routes/logins';
import slugRoutes from './routes/slugs';
import userRoutes from './routes/users';

const logger = rootLogger.child({
	namespace: 'server'
});

const app = nextjs({
	conf: {
		useFileSystemPublicRoutes: false
	},
	dev: config.nodeEnv !== 'production'
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = express();

	server.use(helmet());

	server.use(roarr({
		level: (req) => req.originalUrl.startsWith('/_next') ? 'trace' : 'info',
		logger: rootLogger.child({
			namespace: 'server:routes'
		})
	}));

	server.get('/', (req, res) => res.redirect('/s'));

	server.use(expanderRoutes(app));

	server.use(cookieParser(config.cookieSecret));

	server.use(bodyParser.json({
		strict: true
	}));

	server.use(bodyParser.urlencoded({
		extended: true
	}));

	server.use(loginRoutes(app));
	server.use(slugRoutes(app));
	server.use(userRoutes(app));

	server.get('*', handle);

	server.listen(config.port, (error) => {
		if (error) {
			logger.error('Server failed to start');

			throw error;
		}

		logger.info({
			port: config.port,
			routes: listRoutes(server).reduce((memo, { methods, path }) => [
				...memo,
				...methods.map(method => ({
					method,
					path
				}))
			], []).map(({
				method,
				path
			}) => `${method.padStart(7, ' ')} ${path}`)
		}, 'Server is running');
	});
});
