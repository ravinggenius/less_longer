import express from 'express';

import config from '../config';
import KeyedErrors from '../models/keyed_errors';
import * as Session from '../models/session';

export default (app) => {
	const routes = express.Router();

	const ensureUnAuthenticated = (req, res, next) => {
		if (req.user) {
			res.redirect(req.query.resume || '/');
		}

		next();
	};

	routes.get('/l', ensureUnAuthenticated, (req, res) => {
		const query = {
			errors: {},
			resume: req.query.resume || '/'
		};

		res.format({
			html: () => app.render(req, res, '/l', query),
			json: () => res.status(406).end()
		});
	});

	routes.post('/l', ensureUnAuthenticated, async (req, res) => {
		const { username, password } = req.body;

		try {
			const token = await Session.generateToken(username, password);

			res.cookie('bearerToken', token, {
				httpOnly: true,
				maxAge: config.tokenExpirationSeconds * 1000,
				secure: config.useSecureCookies
			});

			const query = {
				data: {
					token
				}
			};

			res.format({
				html: () => res.redirect(req.query.resume || '/'),
				json: () => res.json(query)
			});
		} catch (error) {
			const query = {
				errors: KeyedErrors.serialize(error),
				resume: req.query.resume || '/',
				username
			};

			res.format({
				html: () => app.render(req, res, '/l', query),
				json: () => res.status(400).json(query)
			});
		}
	});

	return routes;
};
