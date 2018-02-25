const express = require('express');

const protect = require('../../checkCapabilities');
const config = require('../../config');

const user = require('../model');

const routes = express.Router();

const ensureUserCreatable = async (req, res, next) => {
	const count = await user.count();

	if (count === 0) {
		next();
	} else if (config.allowMultipleUsers) {
		next();
	} else {
		res.status(403);
	}
};

routes.get('/', protect('user:read'), (req, res, next) => {
	res.format({
		html: () => res.send('GET `/u`'),
		json: next
	});
});

routes.put('/', protect('user:write'), (req, res, next) => {
	res.format({
		html: () => res.redirect('/u'),
		json: next
	});
});

routes.get('/new', ensureUserCreatable, (req, res) => {
	res.format({
		html: () => res.send('GET `/u/new`'),
		json: () => res.status(406).end()
	});
});

routes.post('/', ensureUserCreatable, (req, res, next) => {
	res.format({
		html: () => res.redirect('/s'),
		json: next
	});
});

module.exports = routes;
