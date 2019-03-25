import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import nextjs from 'next';

import config from './config';
import expanderRoutes from './expander/routes';
import loginRoutes from './logins/routes';
import slugRoutes from './slugs/routes';
import userRoutes from './users/routes';

const app = nextjs({
	dev: config.nodeEnv !== 'production'
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = express();

	server.use(helmet());

	if (config.logFormat !== 'disabled') {
		server.use(morgan(config.logFormat));
	}

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
			throw error;
		}

		// eslint-disable-next-line no-console
		console.log(`Less Longer is running on port ${config.port}`);
	});
});
