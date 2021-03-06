import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React from 'react';

import Errors from './feedback';
import { P } from './text';

export const Button = styled.button`
	background-color: inherit;
	border: 1px solid #999999;
	border-radius: 2px;
	cursor: pointer;
	font-size: 14px;

	&:focus,
	&:hover {
		background-color: #FFFFFF;
		border-color: #333333;
		outline-style: none;
	}
`;

Button.propTypes = {
	children: PropTypes.node.isRequired,
	type: PropTypes.string
};

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
