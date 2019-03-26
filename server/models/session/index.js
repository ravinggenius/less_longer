import jwt from 'jsonwebtoken';

import config from '../../config';
import rootLogger from '../../logger';

import * as User from '../user';

const logger = rootLogger.child({
	namespace: 'server:models:session'
});

export const generateToken = async (username, password) => {
	logger.debug({
		username,
		password: '[redacted]'
	}, 'calling `generateToken`');

	const {
		capabilities,
		isAuthenticated,
		userId
	} = await User.authenticate(username, password);

	if (!isAuthenticated) {
		throw new Error('Invalid user details');
	}

	const payload = {
		capabilities,
		userId
	};

	return jwt.sign(payload, config.jwtSecret, {
		expiresIn: config.tokenExpirationSeconds
	});
};
