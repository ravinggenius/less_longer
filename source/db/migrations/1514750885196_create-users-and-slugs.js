exports.up = (pgm) => {
	pgm.createTable('users', {
		id: {
			notNull: true,
			primaryKey: true,
			unique: true,
			type: 'UUID'
		},
		createdAt: {
			notNull: true,
			type: 'TIMESTAMP WITH TIME ZONE'
		},
		updatedAt: {
			notNull: true,
			type: 'TIMESTAMP WITH TIME ZONE'
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
			type: 'UUID'
		},
		createdAt: {
			notNull: true,
			type: 'TIMESTAMP WITH TIME ZONE'
		},
		updatedAt: {
			notNull: true,
			type: 'TIMESTAMP WITH TIME ZONE'
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

exports.down = (pgm) => {
	pgm.dropTable('slugs');
	pgm.dropTable('users');
};
