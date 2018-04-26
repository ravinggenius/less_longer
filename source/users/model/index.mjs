import bcrypt from 'bcryptjs';

import config from '../../config';
import { db, loadQuery } from '../../db';

const sql = {
	count: loadQuery('users/model/queries/count.sql'),
	create: loadQuery('users/model/queries/create.sql'),
	get: loadQuery('users/model/queries/get.sql')
};

const USERNAME_PATTERN = /^[0-9A-Za-z_]+$/;
const PASSWORD_MIN_LENGTH = 12;

const validate = (username, password) => {
	const errors = [];

	if (!USERNAME_PATTERN.test(username)) {
		errors.push({
			field: 'username',
			message: 'Username must only contain letters, numbers or underscore'
		});
	}

	if (password.length < PASSWORD_MIN_LENGTH) {
		errors.push({
			key: 'password',
			// eslint-disable-next-line max-len
			message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`
		});
	}

	if (errors.length) {
		const error = new Error('Invalid user details');

		error.details = errors;

		throw error;
	}
};

export const authenticate = async (username, password) => {
	try {
		const user = await db.one(sql.get, { username });
		const isAuthenticated = await bcrypt.compare(password, user.hashword);

		return {
			capabilities: user.capabilities,
			isAuthenticated,
			userId: user.id
		};
	} catch (error) {
		return Promise.reject({
			capabilities: [],
			isAuthenticated: false,
			userId: null
		});
	}
};

export const count = () => db.one(
	sql.count,
	null,
	({ count }) => Number.parseInt(count, 10)
);

export const create = async (username, password, capabilities) => {
	validate(username, password);

	const salt = await bcrypt.genSalt(config.hashStrength);
	const hashword = await bcrypt.hash(password, salt);

	return db.one(
		sql.create,
		{ username, hashword, capabilities },
		({ id }) => id
	);
};

export const get = username => db.one(sql.get, { username });
