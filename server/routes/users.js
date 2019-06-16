import express from 'express';

import { protect } from './middlewares/checkCapabilities';
import { ensureUserCreatable } from './middlewares/ensureUserCreatable';

import config from '../config';
import KeyedErrors from '../models/keyed_errors';
import * as Session from '../models/session';
import * as SLUG from '../models/slug/capabilities';
import * as User from '../models/user';
import * as USER from '../models/user/capabilities';

export default (app) => {
	const routes = express.Router();

	routes.get('/u', protect(USER.read), (req, res, next) => {
		const query = {};

		res.format({
			html: () => app.render(req, res, '/u', query),
			json: next
		});
	});

	routes.put('/u', protect(USER.write), (req, res, next) => {
		res.format({
			html: () => res.redirect('/u'),
			json: next
		});
	});

	routes.get('/u/new', ensureUserCreatable, (req, res) => {
		const query = {
			errors: {}
		};

		res.format({
			html: () => app.render(req, res, '/u/new', query),
			json: () => res.status(406).end()
		});
	});

	routes.post('/u', ensureUserCreatable, async (req, res) => {
		const { username, password, passwordConfirmation } = req.body;

		try {
			await User.create(username, password, passwordConfirmation, [
				SLUG.index,
				SLUG.read,
				SLUG.write,
				USER.read,
				USER.write
			]);

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
				html: () => res.redirect(req.query.resume || '/s'),
				json: () => res.status(201).json(query)
			});
		} catch (error) {
			const query = {
				errors: KeyedErrors.serialize(error),
				username
			};

			res.format({
				html: () => res.render(req, res, '/u/new', query),
				json: () => res.status(400).json(query)
			});
		}
	});

	return routes;
};
