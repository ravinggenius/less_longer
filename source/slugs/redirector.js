const express = require('express');

const slug = require('./model');

const routes = express.Router();

routes.get('/:slugCode', async (req, res, next) => {
	const { slugCode } = req.params;

	try {
		const url = await slug.loadUrl(slugCode);

		res.redirect(url);
	} catch (error) {
		next();
	}
});

module.exports = routes;
