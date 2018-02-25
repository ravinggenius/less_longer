const React = require('react');

const config = require('../config');

const pageTitle = subTitle => subTitle ? `${subTitle} | ${config.title}` : config.title;

module.exports = ({ children, title }) => <html>
	<head>
		<title>{pageTitle(title)}</title>
	</head>

	<body>
		<main>{children}</main>
	</body>
</html>;
