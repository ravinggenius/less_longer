import jwt from 'jsonwebtoken';

import config from '../../config';
import rootLogger from '../../logger';
import * as User from '../../users/model';

const logger = rootLogger.child({
	namespace: 'server:logins:generateToken'
});

export default async (username, password) => {
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
