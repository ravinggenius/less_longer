import express from 'express';

import expanderRoutes from './expander';
import loginRoutes from './logins';
import slugRoutes from './slugs';
import userRoutes from './users';

export default (app) => {
	const router = express.Router();

	router.get('/', (req, res) => res.redirect('/s'));

	router.use(expanderRoutes(app));

	router.use(loginRoutes(app));

	router.use(slugRoutes(app));

	router.use(userRoutes(app));

	return router;
};
