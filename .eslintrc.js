module.exports = {
	env: {
		es6: true,
		jest: true,
		node: true
	},

	extends: [
		'eslint:recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:promise/recommended'
	],

	parserOptions: {
		'ecmaVersion': 8
	},

	plugins: [
		'promise'
	],

	rules: {
		'indent': [ 'error','tab' ],

		'linebreak-style': [ 'error','unix' ],

		'import/order': [ 'error', {
			'groups': [
				[ 'builtin', 'external' ],
				'internal',
				'parent',
				'sibling',
				'index'
			],
			'newlines-between': 'always-and-inside-groups'
		} ],

		'quotes': [ 'error','single' ],

		'semi': [ 'error','always' ]
	}
};
