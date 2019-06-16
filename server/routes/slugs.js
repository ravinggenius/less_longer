import express from 'express';

import { protect } from './middlewares/checkCapabilities';

import asJSON from '../asJSON';
import config from '../config';
import * as Slug from '../models/slug';
import * as SLUG from '../models/slug/capabilities';

export default (app) => {
	const routes = express.Router();

	routes.get('/s', protect(SLUG.index), async (req, res) => {
		const slugs = await Slug.list();

		const query = {
			baseUrl: config.baseUrl,
			slugs
		};

		res.format({
			html: () => app.render(req, res, '/s', query),
			json: () => res.json(query)
		});
	});

	routes.post('/s', protect(SLUG.write), async (req, res) => {
		const { code, url } = req.body;
		const { userId } = req.user;

		try {
			const [slug, wasCreated] = await Slug.create(userId, code, url);

			const query = {
				baseUrl: config.baseUrl,
				slug
			};

			res.format({
				html: () => res.redirect(`/s/${slug.code}`),
				json: () => res.status(wasCreated ? 201 : 200).json(query)
			});
		} catch (error) {
			const slugs = await Slug.list();

			const query = {
				error: asJSON(error),
				slugs
			};

			res.format({
				html: () => app.status(400).render(req, res, '/s', query),
				json: () => res.status(400).json(query)
			});
		}
	});

	routes.get('/s/:slugCode', protect(SLUG.read), async (req, res) => {
		const slug = await Slug.get(req.params.slugCode);

		const query = {
			baseUrl: config.baseUrl,
			slug
		};

		res.format({
			html: () => app.render(req, res, '/s', query),
			json: () => res.json(query)
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
