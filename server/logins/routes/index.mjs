import express from 'express';

import asJSON from '../../asJSON';
import config from '../../config';

import generateToken from './generateToken';

export default (app) => {
	const routes = express.Router();

	const ensureUnAuthenticated = (req, res, next) => {
		if (req.user) {
			res.redirect(req.query.resume || '/');
		}

		next();
	};

	routes.get('/l', ensureUnAuthenticated, (req, res) => {
		res.format({
			html: () => app.render(req, res, '/l', {
				resume: req.query.resume
			}),
			json: () => res.status(406).end()
		});
	});

	routes.post('/l', ensureUnAuthenticated, async (req, res) => {
		const { username, password } = req.body;

		try {
			const token = await generateToken(username, password);

			res.cookie('bearerToken', token, {
				httpOnly: true,
				maxAge: config.tokenExpirationSeconds * 1000,
				secure: config.useSecureCookies
			});

			res.format({
				html: () => res.redirect(req.query.resume || '/'),
				json: () => res.json({
					data: {
						token
					}
				})
			});
		} catch (error) {
			res.format({
				html: () => app.render(req, res, '/l', {
					error: asJSON(error),
					username
				}),
				json: () => res.status(400).json({ error: asJSON(error) })
			});
		}
	});

	return routes;
};
