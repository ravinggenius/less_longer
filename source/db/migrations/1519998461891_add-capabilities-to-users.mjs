export const up = (pgm) => {
	pgm.addColumns('users', {
		capabilities: {
			notNull: true,
			type: 'TEXT[]',
			default: pgm.func('ARRAY[]::TEXT[]')
		}
	});
};

export const down = (pgm) => {
	pgm.dropColumns('users', [
		'capabilities'
	]);
};
