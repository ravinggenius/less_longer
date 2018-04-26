import React from 'react';

import config from '../config';

const pageTitle = subTitle => subTitle ? `${subTitle} | ${config.title}` : config.title;

export default ({ children, title }) => <html>
	<head>
		<meta charSet="UTF-8" />

		<title>{pageTitle(title)}</title>
	</head>

	<body>
		<main role="main">{children}</main>
	</body>
</html>;
