export const up = (pgm) => {
	pgm.createTable('users', {
		id: {
			notNull: true,
			primaryKey: true,
			unique: true,
			type: 'UUID',
			default: pgm.func('gen_random_uuid()')
		},
		createdAt: {
			notNull: true,
			type: 'TIMESTAMP WITH TIME ZONE',
			default: pgm.func('now()')
		},
		updatedAt: {
			notNull: true,
			type: 'TIMESTAMP WITH TIME ZONE',
			default: pgm.func('now()')
		},
		username: {
			notNull: true,
			unique: true,
			type: 'string'
		},
		hashword: {
			notNull: true,
			type: 'string'
		}
	});

	pgm.createTable('slugs', {
		id: {
			notNull: true,
			primaryKey: true,
			unique: true,
			type: 'UUID',
			default: pgm.func('gen_random_uuid()')
		},
		createdAt: {
			notNull: true,
			type: 'TIMESTAMP WITH TIME ZONE',
			default: pgm.func('now()')
		},
		updatedAt: {
			notNull: true,
			type: 'TIMESTAMP WITH TIME ZONE',
			default: pgm.func('now()')
		},
		userId: {
			notNull: true,
			references: 'users',
			type: 'UUID'
		},
		code: {
			notNull: true,
			unique: true,
			type: 'string'
		},
		url: {
			notNull: true,
			type: 'string'
		}
	});
};

export const down = (pgm) => {
	pgm.dropTable('slugs');
	pgm.dropTable('users');
};
