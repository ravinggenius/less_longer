import jwt from 'jsonwebtoken';

import config from '../../config';
import * as User from '../../users/model';

export default async (username, password) => {
	const {
		capabilities,
		userId
	} = await User.authenticate(username, password);

	const payload = {
		capabilities,
		userId
	};

	return jwt.sign(payload, config.jwtSecret, {
		expiresIn: config.tokenExpirationSeconds
	});
};
