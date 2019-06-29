import express from 'express';

import config from '../config';
import KeyedErrors from '../models/keyed_errors';
import * as Session from '../models/session';

const ROUTES = {
	loginCreate: {
		action: '/l',
		method: 'POST'
	}
};

export default (app) => {
	const routes = express.Router();

	const ensureUnAuthenticated = (req, res, next) => {
		const { resume = '/' } = req.query;

		if (req.user) {
			res.redirect(resume);
		}

		next();
	};

	routes.get('/l', ensureUnAuthenticated, (req, res) => {
		const query = {
			errors: {},
			routes: ROUTES,
			username: ''
		};

		res.format({
			html: () => app.render(req, res, '/l', query),
			json: () => res.json(query)
		});
	});

	routes.post('/l', ensureUnAuthenticated, async (req, res) => {
		const { username, password } = req.body;
		const { resume = '/' } = req.query;

		try {
			const token = await Session.generateToken(username, password);

			res.cookie('bearerToken', token, {
				httpOnly: true,
				maxAge: config.tokenExpirationSeconds * 1000,
				secure: config.useSecureCookies
			});

			const query = {
				token
			};

			res.format({
				html: () => res.redirect(resume),
				json: () => res.location(resume).json(query)
			});
		} catch (error) {
			const query = {
				errors: KeyedErrors.serialize(error),
				routes: ROUTES,
				username
			};

			res.format({
				html: () => app.render(req, res.status(400), '/l', query),
				json: () => res.status(400).json(query)
			});
		}
	});

	return routes;
};
