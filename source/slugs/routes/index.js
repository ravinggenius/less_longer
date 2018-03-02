const express = require('express');

const protect = require('../../checkCapabilities');

const Slug = require('../model');

const routes = express.Router();

routes.get('/', protect('slug:index'), async (req, res) => {
	const slugs = await Slug.list();

	res.format({
		html: () => res.send('GET `/s`'),
		json: () => res.json({
			data: slugs
		})
	});
});

routes.post('/', protect('slug:write'), (req, res) => {
	res.format({
		html: () => res.redirect('/s/:slugCode'),
		json: () => res.status(204).end()
	});
});

routes.get('/:slugCode', protect('slug:read'), (req, res, next) => {
	res.format({
		html: () => res.send('GET `/s/:slugCode`'),
		json: next
	});
});

routes.put('/:slugCode', protect('slug:write'), (req, res, next) => {
	res.format({
		html: () => res.redirect('/s/:slugCode'),
		json: next
	});
});

module.exports = routes;
