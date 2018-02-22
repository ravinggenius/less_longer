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
				await db.none('INSERT INTO users (username, hashword) VALUES (\'foo\', \'bar\')');
			});

			test('returns user count', async () => {
				const count = await user.count();

				expect(count).toBe(1);
			});
		});
	});
});
