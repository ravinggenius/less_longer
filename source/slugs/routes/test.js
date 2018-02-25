const express = require('express');
const request = require('supertest');

const routes = require('./index');

describe('basic setup', () => {
	let server;

	beforeEach(() => {
		const app = express();
		app.use(routes);
		server = request(app);
	});

	test('prompts for authentication', async () => {
		const response = await server.get('/s');

		expect(response.statusCode).toBe(302);
		expect(response.headers.location).toEqual('/u/new');
	});
});
