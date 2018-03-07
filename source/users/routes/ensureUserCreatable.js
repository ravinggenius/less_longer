const config = require('../../config');

const User = require('../model');

const ensureUserCreatable = async (req, res, next) => {
	const count = await User.count();

	if (count === 0) {
		next();
	} else if (config.allowMultipleUsers) {
		next();
	} else {
		res.sendStatus(403);
	}
};

module.exports = ensureUserCreatable;
