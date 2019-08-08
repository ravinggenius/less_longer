import bcrypt from 'bcryptjs';

import config from '../../config';
import { db, loadQueries } from '../../db';
import rootLogger from '../../logger';

import KeyedErrors from '../keyed_errors';

const logger = rootLogger.child({
	namespace: 'server:models:user'
});

const sql = loadQueries('models/user/queries');

const USERNAME_PATTERN = /^[0-9A-Za-z_]+$/;

const validate = (username, password, passwordConfirmation) => {
	const errors = new KeyedErrors();

	if (!username) {
		errors.add('username', 'Username is required');
	}

	if (!USERNAME_PATTERN.test(username)) {
		errors.add('username', 'Username must only contain letters, numbers or underscore');
	}

	if (password.length < config.passwordMinLength) {
		errors.add('password', `Password must be at least ${config.passwordMinLength} characters long`);
	}

	if (password !== passwordConfirmation) {
		errors.add('passwordConfirmation', 'Confirmation does not match password');
	}

	if (errors.length) {
		errors.add('base', 'Invalid user details');

		throw errors;
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
