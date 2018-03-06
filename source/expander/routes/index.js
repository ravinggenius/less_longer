const express = require('express');

const slug = require('../../slugs/model');

const routes = express.Router();

routes.get('/:slugCode', async (req, res, next) => {
	const { slugCode } = req.params;

	if (slugCode.length === 1) {
		return next();
	}

	const url = await slug.loadUrl(slugCode);

	if (url) {
		res.redirect(url);
	} else {
		next();
	}
});

module.exports = routes;
