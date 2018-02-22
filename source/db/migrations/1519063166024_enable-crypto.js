exports.up = (pgm) => {
	pgm.createExtension('pgcrypto');
};

exports.down = (pgm) => {
	pgm.dropExtension('pgcrypto');
};
