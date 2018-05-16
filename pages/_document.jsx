import { extractCritical } from 'emotion-server';
import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';
import { injectGlobal } from 'react-emotion';

injectGlobal`
	* {
		box-sizing: border-box;
	}

	body {
		background-attachment: fixed;
		background-image:
			linear-gradient(
				rgba(255, 255, 255, 0.1) 0%,
				rgba(0, 0, 0, 0.9) 100%
			),
			linear-gradient(
				90deg,
				#F79533 0%,
				#F37055 15%,
				#EF4E7B 30%,
				#A166AB 44%,
				#5073B8 58%,
				#1098AD 72%,
				#07B39B 86%,
				#6DBA82 100%
			);
		font-family: sans-serif;
		margin: 0;
	}
`;

export default class Layout extends Document {
	static getInitialProps({ renderPage }) {
		const page = renderPage();
		const styles = extractCritical(page.html);

		return {
			...page,
			...styles
		};
	}

	constructor(props) {
		super(props);

		const { __NEXT_DATA__, ids } = props;

		if (ids) {
			__NEXT_DATA__.ids = ids;
		}
	}

	render() {
		const { css } = this.props;

		return <html>
			<Head>
				<meta charSet="UTF-8" />

				<title>Less Longer</title>

				<style dangerouslySetInnerHTML={{ __html: css }} />
			</Head>

			<body>
				<main role="main"><Main /></main>

				<NextScript />
			</body>
		</html>;
	}
}
