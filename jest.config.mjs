export default {
	coveragePathIgnorePatterns: [
		'./node_modules',
		'./test'
	],
	coverageReporters: [
		'json',
		'lcov',
		'text-summary'
	],
	setupTestFrameworkScriptFile: './test/setup/index.js'
};
