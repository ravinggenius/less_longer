const express = require('express');
const path = require('path');

const config = require('../../config');

const generateToken = require('./generateToken');

const routes = express();

routes.set('views', path.join(__dirname, 'views'));

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

module.exports = routes;
