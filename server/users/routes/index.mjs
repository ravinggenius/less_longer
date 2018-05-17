import express from 'express';

import asJSON from '../../asJSON';
import { protect } from '../../checkCapabilities';
import config from '../../config';
import generateToken from '../../logins/routes/generateToken';
import * as SLUG from '../../slugs/model/capabilities';

import * as User from '../model';
import * as USER from '../model/capabilities';

import { ensureUserCreatable } from './ensureUserCreatable';

export default (app) => {
	const routes = express.Router();

	routes.get('/u', protect(USER.read), (req, res, next) => {
		res.format({
			html: () => app.render(req, res, '/u', {}),
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
		res.format({
			html: () => app.render(req, res, '/u/new', {}),
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

			const token = await generateToken(username, password);

			res.cookie('bearerToken', token, {
				httpOnly: true,
				maxAge: config.tokenExpirationSeconds * 1000,
				secure: config.useSecureCookies
			});

			res.format({
				html: () => res.redirect(req.query.resume || '/s'),
				json: () => res.status(201).json({
					data: {
						token
					}
				})
			});
		} catch (error) {
			res.format({
				html: () => res.render(req, res, '/u/new', {
					error: asJSON(error),
					username
				}),
				json: () => res.status(400).json({ error: asJSON(error) })
			});
		}
	});

	return routes;
};
