module.exports.up = (pgm) => {
	pgm.addColumns('users', {
		capabilities: {
			notNull: true,
			type: 'TEXT[]',
			default: pgm.func('ARRAY[]::TEXT[]')
		}
	});
};

module.exports.down = (pgm) => {
	pgm.dropColumns('users', [
		'capabilities'
	]);
};
