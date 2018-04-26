const { db } = require('../../db');

const user = require('./index');

describe('user model', () => {
	describe('count()', () => {
		describe('when no users', () => {
			test('returns user count', async () => {
				const count = await user.count();

				expect(count).toBe(0);
			});
		});

		describe('when some users', () => {
			beforeEach(async () => {
				await db.none(`
					INSERT INTO users (username, hashword)
					VALUES ('foo', 'bar')
				`);
			});

			test('returns user count', async () => {
				const count = await user.count();

				expect(count).toBe(1);
			});
		});
	});

	describe('create()', () => {
		test('resolves to new user id', async () => {
			const id = await user.create('foo', 'bar');
			const pattern = /[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}/;

			expect(id).toMatch(pattern);
		});

		test('hashes the password', async () => {
			const password = 'bar';
			const id = await user.create('foo', 'bar');
			const attrs = await db.one(`
				SELECT *
				FROM users
				WHERE id = $<id>
			`, { id });

			expect(attrs).not.toHaveProperty('password');
			expect(attrs.hashword).not.toEqual(password);
		});
	});
});
