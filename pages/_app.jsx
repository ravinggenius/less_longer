import { Global, css } from '@emotion/core';
import NextApp, { Container } from 'next/app';
import React from 'react';

class App extends NextApp {
	static async getInitialProps({ Component, ctx }) {
		const pageProps = Component.getInitialProps
			? await Component.getInitialProps(ctx)
			: {};

		return { pageProps };
	}

	render() {
		const { Component, pageProps } = this.props;

		return (
			<Container>
				{/* <meta charSet="UTF-8" /> */}

				{/* <title>Less Longer</title> */}

				<Global
					styles={css`
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
					`}
				/>

				<main role="main">
					<Component {...pageProps} />
				</main>
			</Container>
		);
	}
}

export default App;
