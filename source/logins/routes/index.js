const express = require('express');

const routes = express.Router();

const ensureUnAuthenticated = (req, res, next) => {
	if (req.user) {
		res.redirect(req.query.resume || '/');
	}

	next();
};

routes.get('/', ensureUnAuthenticated, (req, res) => {
	res.format({
		html: () => res.send('GET `/l`'),
		json: () => res.status(406).end()
	});
});

routes.post('/', (req, res) => {
	res.format({
		html: () => res.redirect(req.query.resume || '/'),
		json: () => null
	});
});

module.exports = routes;
