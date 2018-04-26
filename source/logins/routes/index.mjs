import express from 'express';
import path from 'path';

import config from '../../config';
import dirName from '../../dirName';

import generateToken from './generateToken';

const routes = express();

routes.set('views', path.join(dirName(import.meta), 'views'));

const ensureUnAuthenticated = (req, res, next) => {
	if (req.user) {
		res.redirect(req.query.resume || '/');
	}

	next();
};

routes.get('/', ensureUnAuthenticated, (req, res) => {
	res.format({
		html: () => res.render('new'),
		json: () => res.status(406).end()
	});
});

routes.post('/', ensureUnAuthenticated, async (req, res) => {
	const { username, password } = req.body;

	try {
		const token = await generateToken(username, password);

		res.format({
			html: () => {
				res.cookie('bearerToken', token, {
					httpOnly: true,
					maxAge: config.tokenExpirationSeconds * 1000,
					secure: config.useSecureCookies
				});
				res.redirect(req.query.resume || '/');
			},

			json: () => res.json({
				data: {
					token
				}
			})
		});
	} catch (error) {
		res.format({
			html: () => res.render('new', { error, username }),
			json: () => res.status(400).json({ error })
		});
	}
});

export default routes;
