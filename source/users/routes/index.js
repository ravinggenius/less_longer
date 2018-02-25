const express = require('express');
const path = require('path');

const protect = require('../../checkCapabilities');

const ensureUserCreatable = require('./ensureUserCreatable');

const routes = express();

routes.set('views', path.join(__dirname, 'views'));

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
		html: () => res.render('new'),
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
