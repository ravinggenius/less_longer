const jwt = require('jsonwebtoken');

const config = require('../../config');
const User = require('../../users/model');

const generateToken = async (username, password) => {
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

module.exports = generateToken;
