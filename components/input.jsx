import PropTypes from 'prop-types';
import React from 'react';
import styled from 'react-emotion';

const Input = styled.input`
	background-color: inherit;
	border: 1px solid #999999;
	border-radius: 2px;
	font-size: 20px;
	width: 100%;

	&:hover,
	&:focus {
		background-color: #FFFFFF;
		border-color: #333333;
		outline-style: none;
	}
`;

const Label = styled.label`
	display: block;
	padding-bottom: 10px;
`;

const LabelText = styled.span`
	display: block;
	font-size: 14px;
`;

const Wrapper = ({
	label,
	name,
	onChange,
	required = false,
	type = 'text',
	value,
	...ambient
}) => <Label {...ambient}>
	<LabelText>{label}</LabelText>
	<Input {...{ name, onChange, required, type }} defaultValue={value} />
</Label>;

Wrapper.propTypes = {
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	required: PropTypes.bool,
	type: PropTypes.string,
	value: PropTypes.string.isRequired
};

export default Wrapper;
