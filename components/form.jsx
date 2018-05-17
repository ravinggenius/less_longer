import PropTypes from 'prop-types';
import React from 'react';
import styled from 'react-emotion';

import Errors from './feedback';
import { P } from './text';

export const Button = styled.button`
	background-color: #FFFFFF;
	border: 1px solid #999999;
	border-radius: 2px;
	cursor: pointer;
	font-size: 14px;
	width: 100%;

	&:focus {
		border-color: #333333;
		outline-style: none;
	}
`;

Button.propTypes = {
	children: PropTypes.node.isRequired,
	type: PropTypes.string
};

const Form = styled.form`
	background-color: #FFFFFF;
	border-radius: 2px;
	box-shadow: 2px 2px #666666;
	padding: 20px;

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
