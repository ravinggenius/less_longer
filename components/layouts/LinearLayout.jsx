import styled from '@emotion/styled';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

const Inner = styled.div`
	display: grid;
	grid-template-areas:
		"header header header"
		"......  body  ......"
		"......  ....  ......"
	;
	grid-template-columns:
		1fr ${({ hasHeader }) => hasHeader ? '90vw' : 'max-content'} 1fr;
	grid-template-rows:
		${({ hasHeader }) => hasHeader ? 'min-content' : '1fr'} max-content 1fr;
	height: 100vh;
`;

export const Header = styled.header`
	grid-area: header;
	text-align: center;
`;

export const Body = styled.section`
	background-color: rgba(255, 255, 255, 0.99);
	border-radius: 2px;
	box-shadow: 2px 2px #666666;
	display: grid;
	grid-area: body;
	grid-gap: 20px;
	padding: 20px;
`;

const Layout = ({ children, header = null, title, ...ambient }) => <Fragment>
	<Head>
		<title>{title ? `${title} | Less Longer` : 'Less Longer'}</title>
	</Head>

	<Inner {...ambient} hasHeader={!!header}>
		{header ? <Header>{header}</Header> : null}

		<Body>{children}</Body>
	</Inner>
</Fragment>;

Layout.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.element.isRequired),
		PropTypes.element
	]).isRequired,
	header: PropTypes.node,
	title: PropTypes.string
};

export default Layout;
