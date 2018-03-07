const express = require('express');
const path = require('path');

const protect = require('../../checkCapabilities');
const config = require('../../config');
const generateToken = require('../../logins/routes/generateToken');
const SLUG = require('../../slugs/model/capabilities');

const User = require('../model');
const USER = require('../model/capabilities');

const ensureUserCreatable = require('./ensureUserCreatable');

const routes = express();

routes.set('views', path.join(__dirname, 'views'));

routes.get('/', protect(USER.read), (req, res, next) => {
	res.format({
		html: () => res.send('GET `/u`'),
		json: next
	});
});

routes.put('/', protect(USER.write), (req, res, next) => {
	res.format({
		html: () => res.redirect('/u'),
		json: next
	});
});

routes.get('/new', ensureUserCreatable, (req, res) => {
	res.format({
		html: () => res.render('new'),
		json: () => res.status(406).end()
	});
});

routes.post('/', ensureUserCreatable, async (req, res) => {
	const { username, password } = req.body;

	try {
		await User.create(username, password, [
			SLUG.index,
			SLUG.read,
			SLUG.write,
			USER.read,
			USER.write
		]);

		const token = await generateToken(username, password);

		res.format({
			html: () => {
				res.cookie('bearerToken', token, {
					httpOnly: true,
					maxAge: config.tokenExpirationSeconds * 1000,
					secure: config.useSecureCookies
				});
				res.redirect(req.query.resume || '/s');
			},

			json: () => res.statusCode(204).json({
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
