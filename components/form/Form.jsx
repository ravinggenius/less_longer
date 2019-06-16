import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React from 'react';

import P from '../text/P';

import Button from './Button';
import Errors from './Errors';

const Form = styled.form`
	display: flex;
	flex-direction: column;

	${Button} {
		margin-left: auto;
	}

	${P} {
		color: #000000;
	}
`;

const Wrapper = ({
	action,
	children,
	errors,
	method,
	onSubmit,
	...ambient
}) => (
	<Form {...{ action, method, onSubmit }} {...ambient}>
		<Errors messages={errors} />

		{children}
	</Form>
);

Wrapper.defaultProps = {
	errors: []
};

Wrapper.propTypes = {
	action: PropTypes.string.isRequired,
	errors: PropTypes.arrayOf(PropTypes.string),
	children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
	method: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired
};

export default Wrapper;
