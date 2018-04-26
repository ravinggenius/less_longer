import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import expressReact from 'express-react-views';
import helmet from 'helmet';
import morgan from 'morgan';

import config from './config';
import dirName from './dirName';
import expanderRoutes from './expander/routes';
import loginRoutes from './logins/routes';
import slugRoutes from './slugs/routes';
import userRoutes from './users/routes';

const server = express();

server.engine('jsx', expressReact.createEngine({
	babel: {
		only: `${dirName(import.meta)}/**/*.jsx`,
		presets: [
			'react', [
				'env', {
					targets: {
						node: 'current'
					}
				}
			]
		]
	}
}));

server.set('view engine', 'jsx');

server.use(helmet());

if (config.logFormat !== 'disabled') {
	server.use(morgan(config.logFormat));
}

server.get('/', (req, res) => res.redirect('/s'));

server.use(expanderRoutes);

server.use(cookieParser(config.cookieSecret));

server.use(bodyParser.json({
	strict: true
}));

server.use(bodyParser.urlencoded({
	extended: true
}));

server.use('/l', loginRoutes);
server.use('/s', slugRoutes);
server.use('/u', userRoutes);

server.use((req, res) => res.format({
	html: () => res.sendStatus(404),
	json: () => res.status(404).json({
		error: {
			message: 'Not found'
		}
	})
}));

export default server;
