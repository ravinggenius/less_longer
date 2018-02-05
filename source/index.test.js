const request = require('supertest');

const server = require('./index');

describe('basic setup', () => {
	test('redirects to /s', async () => {
		const response = await request(server).get('/');

		expect(response.statusCode).toBe(302);
		expect(response.headers.location).toEqual('/s');
	});
});
