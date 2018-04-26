import request from 'supertest';

import server from './server';

describe('basic setup', () => {
	test('redirects to /s', async () => {
		const response = await request(server).get('/');

		expect(response.statusCode).toBe(302);
		expect(response.headers.location).toEqual('/s');
	});
});
