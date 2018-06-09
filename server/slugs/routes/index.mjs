import express from 'express';

import { protect } from '../../checkCapabilities';

import * as Slug from '../model';
import * as SLUG from '../model/capabilities';

export default (app) => {
	const routes = express.Router();

	routes.get('/s', protect(SLUG.index), async (req, res) => {
		const slugs = await Slug.list();

		res.format({
			html: () => app.render(req, res, '/s', { slugs }),
			json: () => res.json({
				data: slugs
			})
		});
	});

	routes.post('/s', protect(SLUG.write), (req, res) => {
		res.format({
			html: () => res.redirect('/s/:slugCode'),
			json: () => res.status(204).end()
		});
	});

	routes.get('/s/:slugCode', protect(SLUG.read), async (req, res, next) => {
		const slug = await Slug.get(req.params.slugCode);

		res.format({
			html: () => app.render(req, res, '/s', {
				slugs: [ slug ]
			}),
			json: next
		});
	});

	routes.put('/s/:slugCode', protect(SLUG.write), (req, res, next) => {
		res.format({
			html: () => res.redirect('/s/:slugCode'),
			json: next
		});
	});

	return routes;
};
