import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'react-emotion';

const Wrapper = styled.span`
	color: #999999;
	display: contents;
`;

const Slug = styled.span`
`;

const Decor = styled(FAIcon)`
	color: #DDDDDD;
`;

const URL = styled.a`
	color: inherit;
`;

const Redirection = ({ baseUrl, code, url }) => <Wrapper>
	<Slug>{baseUrl}/{code}</Slug>
	<Decor icon={faLongArrowAltRight} />
	<URL href={url}>{url}</URL>
</Wrapper>;

Redirection.propTypes = {
	baseUrl: PropTypes.string.isRequired,
	code: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired
};

export default Redirection;
