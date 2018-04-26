import config from '../../config';

import * as User from '../model';

export const ensureUserCreatable = async (req, res, next) => {
	const count = await User.count();

	if (count === 0) {
		next();
	} else if (config.allowMultipleUsers) {
		next();
	} else {
		res.sendStatus(403);
	}
};
