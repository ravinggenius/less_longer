import jwt from 'jsonwebtoken';

import config from '../../config';
import * as User from '../../users/model';

export default async (username, password) => {
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
