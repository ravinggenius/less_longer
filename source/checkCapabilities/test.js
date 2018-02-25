const express = require('express');
const request = require('supertest');

// const { db } = require('../db');
const user = require('../users/model');

const protect = require('./index');

describe('capabilities', () => {
	let server;

	beforeEach(() => {
		const app = express();
		app.use(protect('foo'));
		app.get('/', (req, res) => {
			res.send('very secret');
		});
		server = request(app);
	});

	describe('no existing users', () => {
		test('verify no users', async () => {
			const usersCount = await user.count();

			expect(usersCount).toBe(0);
		});

		describe('html', () => {
			test('prompts for new user', async () => {
				const response = await server.get('/')
					.set('Accept', 'text/html');

				expect(response.statusCode).toBe(302);
				expect(response.headers.location).toEqual('/u/new');
			});
		});

		describe('json', () => {
			test('returns error', async () => {
				const response = await server.get('/')
					.set('Accept', 'application/json');

				expect(response.statusCode).toBe(401);
				expect(response.headers['content-type']).toMatch(/json/);
				expect(response.body).toEqual({
					error: {
						message: 'No users available'
					}
				});
			});
		});
	});

	describe('with existing users', () => {
		beforeEach(async () => {
			await user.create('foo', 'bar');
		});

		test('verify a user', async () => {
			const usersCount = await user.count();

			// const foo = await db.one('SELECT * FROM users');

			expect(usersCount).toBeGreaterThan(0);
		});

		// describe('html', () => {
		// 	test('prompts for login', async () => {
		// 		const response = await server.get('/')
		// 			.set('Accept', 'text/html');

		// 		expect(response.statusCode).toBe(401);
		// 	});
		// });

		// describe('json', () => {
		// 	test('returns error', async () => {
		// 		const response = await server.get('/')
		// 			.set('Accept', 'application/json');

		// 		expect(response.statusCode).toBe(401);
		// 		expect(response.headers['content-type']).toMatch(/json/);
		// 		expect(response.body).toEqual({
		// 			error: {
		// 				message: 'Not authorized'
		// 			}
		// 		});
		// 	});
		// });
	});
});
