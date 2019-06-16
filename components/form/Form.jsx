import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React from 'react';

import P from '../text/P';

import Button from './Button';
import Errors from './Errors';

export const SAFE_METHODS = [
	'GET',
	'POST'
];

export const METHODS = [
	...SAFE_METHODS,
	'DELETE',
	'PUT'
]

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

const HiddenMethod = styled.input`
	display: none;
`;

HiddenMethod.defaultProps = {
	name: '_method',
	type: 'hidden'
}

const Wrapper = ({
	children,
	errors,
	onSubmit,
	route: {
		action,
		method: intendedMethod
	},
	...ambient
}) => {
	const actualMethod = SAFE_METHODS.includes(intendedMethod) ? intendedMethod : 'POST';

	return (
		<Form
			{...{ action, onSubmit }}
			data-intended-method={intendedMethod}
			method={actualMethod}
			{...ambient}
		>
			<HiddenMethod value={intendedMethod} />
			<Errors messages={errors} />

			{children}
		</Form>
	);
};

Wrapper.defaultProps = {
	errors: []
};

Wrapper.propTypes = {
	errors: PropTypes.arrayOf(PropTypes.string),
	children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
	route: PropTypes.shape({
		action: PropTypes.string.isRequired,
		method: PropTypes.string.isRequired
	}).isRequired,
	onSubmit: PropTypes.func.isRequired
};

export default Wrapper;
