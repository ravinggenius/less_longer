const express = require('express');

const protect = require('../../checkCapabilities');

const routes = express.Router();

routes.get('/', protect('slug:index'), (req, res) => {
	res.format({
		html: () => res.send('GET `/s`'),
		json: () => null
	});
});

routes.post('/', protect('slug:write'), (req, res) => {
	res.format({
		html: () => res.redirect('/s/:slugCode'),
		json: () => null
	});
});

routes.get('/:slugCode', protect('slug:read'), (req, res) => {
	res.format({
		html: () => res.send('GET `/s/:slugCode`'),
		json: () => null
	});
});

routes.put('/:slugCode', protect('slug:write'), (req, res) => {
	res.format({
		html: () => res.redirect('/s/:slugCode'),
		json: () => null
	});
});

module.exports = routes;
