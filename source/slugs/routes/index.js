const express = require('express');
const path = require('path');

const protect = require('../../checkCapabilities');

const Slug = require('../model');
const SLUG = require('../model/capabilities');

const routes = express();

routes.set('views', path.join(__dirname, 'views'));

routes.get('/', protect(SLUG.index), async (req, res) => {
	const slugs = await Slug.list();

	res.format({
		html: () => res.render('index', { slugs }),
		json: () => res.json({
			data: slugs
		})
	});
});

routes.post('/', protect(SLUG.write), (req, res) => {
	res.format({
		html: () => res.redirect('/s/:slugCode'),
		json: () => res.status(204).end()
	});
});

routes.get('/:slugCode', protect(SLUG.read), (req, res, next) => {
	res.format({
		html: () => res.send('GET `/s/:slugCode`'),
		json: next
	});
});

routes.put('/:slugCode', protect(SLUG.write), (req, res, next) => {
	res.format({
		html: () => res.redirect('/s/:slugCode'),
		json: next
	});
});

module.exports = routes;
