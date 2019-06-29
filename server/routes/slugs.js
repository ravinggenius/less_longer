import express from 'express';

import { protect } from './middlewares/checkCapabilities';

import config from '../config';
import KeyedErrors from '../models/keyed_errors';
import * as Slug from '../models/slug';
import * as SLUG from '../models/slug/capabilities';

const ROUTES = {
	slugCreate: {
		action: '/s',
		method: 'POST'
	}
};

export default (app) => {
	const routes = express.Router();

	routes.get('/s', protect(SLUG.index), async (req, res) => {
		const slugs = await Slug.list();

		const query = {
			baseUrl: config.baseUrl,
			code: '',
			customize: false,
			errors: {},
			routes: ROUTES,
			slugs,
			url: ''
		};

		res.format({
			html: () => app.render(req, res, '/s', query),
			json: () => res.json(query)
		});
	});

	routes.post('/s', protect(SLUG.write), async (req, res) => {
		const { code, customize, url } = req.body;
		const { userId } = req.user;

		const slugs = await Slug.list();

		try {
			const [slug, wasCreated] = await Slug.create(userId, code, url);

			const query = {
				baseUrl: config.baseUrl,
				code: '',
				customize: false,
				errors: {},
				routes: ROUTES,
				slug,
				slugs,
				url: ''
			};

			const location = `/s/${slug.code}`;

			res.format({
				html: () => res.redirect(location),
				json: () => res.status(wasCreated ? 201 : 200).location(location).json(query)
			});
		} catch (error) {
			const slugs = await Slug.list();

			const query = {
				baseUrl: config.baseUrl,
				code,
				customize,
				errors: KeyedErrors.serialize(error),
				routes: ROUTES,
				slugs,
				url
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
			html: () => app.render(req, res, '/s/_show', query),
			json: () => res.json(query)
		});
	});

	return routes;
};
