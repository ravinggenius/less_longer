import { extractCritical } from 'emotion-server';
import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';

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
