const express = require('express');
const jwt = require('express-jwt');
const buildPermissions = require('express-jwt-permissions');

const config = require('../config');
const User = require('../users/model');

const guard = buildPermissions();

module.exports = (...capabilities) => {
	const routes = express.Router();

	routes.use(async (req, res, next) => {
		const count = await User.count();

		if (count === 0) {
			res.format({
				html: () => res.redirect('/u/new'),
				json: () => res.status(401).json({
					error: {
						message: 'No users available'
					}
				})
			});
		} else {
			next();
		}
	});

	routes.use(jwt({
		getToken: (req) => {
			const { authorization } = req.headers;

			if (authorization) {
				const [ type, token ] = authorization.split(' ');

				if ((type.toLowerCase() === 'bearer') && token) {
					return token;
				}
			}

			const { bearerToken } = req.cookies;

			if (bearerToken) {
				return bearerToken;
			}

			return null;
		},
		secret: config.jwtSecret
	}), (error, req, res, next) => {
		if (error && (error.code === 'credentials_required')) {
			res.format({
				html: () => res.redirect(`/l?resume=${req.originalUrl}`),
				json: () => res.json(error)
			});
		} else if (error) {
			res.format({
				html: () => next,
				json: () => res.json(error)
			});
		} else {
			next();
		}
	});

	routes.use(guard.check(...capabilities), (error, req, res, next) => {
		if (error) {
			res.status(403).format({
				html: next,
				json: () => res.json(error)
			});
		} else {
			next();
		}
	});

	return routes;
};
