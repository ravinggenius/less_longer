const express = require('express');
const path = require('path');

const protect = require('../../checkCapabilities');
const SLUG = require('../../slugs/model/capabilities');

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

routes.post('/', ensureUserCreatable, (req, res, next) => {
	res.format({
		html: () => res.redirect('/s'),
		json: next
	});
});

module.exports = routes;
