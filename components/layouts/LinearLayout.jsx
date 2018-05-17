import Head from 'next/head';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import styled from 'react-emotion';

const Inner = styled.div`
	display: grid;
	grid-template-areas:
		"header header header"
		"......  body  ......"
	;
	grid-template-columns: 1fr 90vw 1fr;
	grid-template-rows: min-content 1fr;
	height: 100vh;
`;

export const Header = styled.header`
	grid-area: header;
	text-align: center;
`;

export const Body = styled.section`
	grid-area: body;
`;

export const SmallBody = styled(Body)`
	align-items: center;
	display: flex;
	justify-content: center;
`;

const Layout = ({ children, title, ...ambient }) => <Fragment>
	<Head>
		<title>{title ? `${title} | Less Longer` : 'Less Longer'}</title>
	</Head>

	<Inner {...ambient}>
		{children}
	</Inner>
</Fragment>;

Layout.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.element.isRequired),
		PropTypes.element
	]).isRequired,
	title: PropTypes.string
};

export default Layout;
