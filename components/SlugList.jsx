import styled from '@emotion/styled';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

import Redirection from './Redirection';
import { P } from './Text';

const UL = styled.ul`
	display: grid;
	gap: 5px;
	grid-template-columns: repeat(4, min-content);
	list-style-type: none;
	margin: 0;
	padding: 0;
`;

const LI = styled.li`
	display: contents;
`;

const Code = styled.a`
	color: #333333;
`;

const SlugsList = ({ baseUrl, slugs }) => slugs.length ? <UL>
	{slugs.map(({ id, code, url }) => <LI key={id}>
		<Link as={`/s/${code}`} href={`/s?slugCode=${code}`} passHref>
			<Code>/s/{code}</Code>
		</Link>

		<Redirection {...{ baseUrl, code, url }} />
	</LI>)}
</UL> : <P>No slugs to list</P>;

SlugsList.propTypes = {
	baseUrl: PropTypes.string.isRequired,
	slugs: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default SlugsList;
