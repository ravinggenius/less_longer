const express = require('express');
const jwt = require('express-jwt');
const buildPermissions = require('express-jwt-permissions');

const config = require('../config');

const user = require('./users/model');

const guard = buildPermissions();

module.exports = (...capabilities) => {
	const routes = express.Router();

	routes.use(async (req, res, next) => {
		const count = await user.count();

		if (count === 0) {
			res.format({
				html: () => res.redirect('/u/new'),
				json: () => res.status(401).end()
			});
		} else {
			next();
		}
	});

	routes.use(jwt({
		getToken: (req) => {
			const { authorization } = req.headers;

			if (authorization) {
				const [ _, token ] = authorization.split(' ');

				if (token) {
					return token;
				}
			}

			const { bearerToken } = req.cookies;

			if (bearerToken) {
				return bearerToken;
			}

			return null;
		},
		secret: config.sessionSecret
	}), (error, req, res, next) => {
		if (error && (error.code === 'credentials_required')) {
			res.format({
				html: () => res.redirect(`/l?resume=${req.originalUrl}`),
				json: () => res.send(error)
			});
		} else if (error) {
			res.format({
				html: () => null,
				json: () => res.send(error)
			});
		} else {
			next();
		}
	});

	routes.use(guard.check(...capabilities), (error, req, res, next) => {
		if (error) {
			res.format({
				html: () => null,
				json: () => res.send(error)
			});
		} else {
			next();
		}
	});

	return routes;
};
