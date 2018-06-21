import PropTypes from 'prop-types';
import React from 'react';
import styled from 'react-emotion';

import { P } from './text';

const UL = styled.ul`
	list-style-type: none;
	margin: 0;
	padding: 0;
`;

const LI = styled.li`
	display: flex;
	justify-content: space-between;
`;

const Code = styled.span``;

const URL = styled.span``;

const SlugsList = ({ slugs }) => slugs.length ? <UL>
	{slugs.map(({ id, code, url }) => <LI key={id}>
		<Code>{code}</Code>
		<URL>{url}</URL>
	</LI>)}
</UL> : <P>No slugs to list</P>;

SlugsList.propTypes = {
	slugs: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default SlugsList;
