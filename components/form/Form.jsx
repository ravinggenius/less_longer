import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React from 'react';

import Errors from '../Errors';
import P from '../text/P';

import Button from './Button';

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
	error,
	method,
	onSubmit,
	...ambient
}) => <Form {...{ action, method, onSubmit }} {...ambient}>
		{error && <Errors {...error} />}

		{children}
	</Form>;

Wrapper.propTypes = {
	action: PropTypes.string.isRequired,
	error: PropTypes.shape({
		details: PropTypes.arrayOf(PropTypes.shape({
			message: PropTypes.string.isRequired
		})),
		message: PropTypes.string.isRequired
	}),
	children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
	method: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired
};

export default Wrapper;
