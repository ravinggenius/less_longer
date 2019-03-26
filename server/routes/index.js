import express from 'express';

import { routes as expanderRoutes } from './expander';
import { routes as loginRoutes } from './logins';
import { routes as slugRoutes } from './slugs';
import { routes as userRoutes } from './users';

export default (app) => {
	const router = express.Router();

	router.get('/', (req, res) => res.redirect('/s'));

	router.use(expanderRoutes(app));

	router.use(loginRoutes(app));

	router.use(slugRoutes(app));

	router.use(userRoutes(app));

	return router;
};
