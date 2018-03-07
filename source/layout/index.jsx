const React = require('react');

const config = require('../config');

const pageTitle = subTitle => subTitle ? `${subTitle} | ${config.title}` : config.title;

module.exports = ({ children, title }) => <html>
	<head>
		<meta charSet="UTF-8" />

		<title>{pageTitle(title)}</title>
	</head>

	<body>
		<main role="main">{children}</main>
	</body>
</html>;
