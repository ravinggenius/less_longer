module.exports.up = (pgm) => {
	pgm.createExtension('pgcrypto', {
		ifNotExists: true
	});
};

module.exports.down = (pgm) => {
	pgm.dropExtension('pgcrypto');
};
