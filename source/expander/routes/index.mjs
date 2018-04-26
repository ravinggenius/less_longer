import express from 'express';

import * as Slug from '../../slugs/model';

const routes = express.Router();

routes.get('/:slugCode', async (req, res, next) => {
	const { slugCode } = req.params;

	if (slugCode.length === 1) {
		return next();
	}

	const url = await Slug.loadUrl(slugCode);

	if (url) {
		res.redirect(url);
	} else {
		next();
	}
});

export default routes;
