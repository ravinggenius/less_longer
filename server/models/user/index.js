import bcrypt from 'bcryptjs';

import config from '../../config';
import { db, loadQueries } from '../../db';
import rootLogger from '../../logger';

const logger = rootLogger.child({
	namespace: 'server:models:user'
});

const sql = loadQueries('models/user/queries');

const USERNAME_PATTERN = /^[0-9A-Za-z_]+$/;
const PASSWORD_MIN_LENGTH = 12;

const validate = (username, password, passwordConfirmation) => {
	const errors = [];

	if (!USERNAME_PATTERN.test(username)) {
		errors.push({
			field: 'username',
			message: 'Username must only contain letters, numbers or underscore'
		});
	}

	if (password.length < PASSWORD_MIN_LENGTH) {
		errors.push({
			field: 'password',
			// eslint-disable-next-line max-len
			message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`
		});
	}

	if (password !== passwordConfirmation) {
		errors.push({
			field: 'passwordConfirmation',
			message: 'Confirmation does not match password'
		});
	}

	if (errors.length) {
		const error = new Error('Invalid user details');

		error.details = errors;

		throw error;
	}
};

export const authenticate = async (username, password) => {
	logger.debug({
		username,
		password: '[redacted]'
	}, 'Calling `authenticate`');

	const user = await db.oneOrNone(sql.get, { username });

	if (user) {
		const isAuthenticated = await bcrypt.compare(
			password || '',
			user.hashword
		);

		return {
			capabilities: isAuthenticated ? user.capabilities : [],
			isAuthenticated,
			userId: user.id
		};
	} else {
		return {
			capabilities: [],
			isAuthenticated: false,
			userId: null
		};
	}
};

export const count = () => {
	logger.debug('Calling `count`');

	return db.one(sql.count, null, ({ count }) => Number.parseInt(count, 10));
}

export const create = async (
	username,
	password,
	passwordConfirmation,
	capabilities
) => {
	logger.debug({
		username,
		password: '[redacted]',
		passwordConfirmation: '[redacted]',
		capabilities
	}, 'Calling `create`');

	validate(username, password || '', passwordConfirmation);

	const salt = await bcrypt.genSalt(config.hashStrength);
	const hashword = await bcrypt.hash(password, salt);

	return db.one(
		sql.create,
		{ username, hashword, capabilities },
		({ id }) => id
	);
};

export const get = username => {
	logger.debug({ username }, 'Calling `get`');

	return db.one(sql.get, { username });
};
