import styled from '@emotion/styled';
import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

const Label = styled.label`
	align-items: center;
	column-gap: 5px;
	display: grid;
	grid-auto-flow: column;
`;

const Input = styled.input`
	display: none;
`;

const Check = styled(FAIcon)`
	color: #333333;
`;

const LabelText = styled.span`
	font-size: 14px;
`;

const Wrapper = ({
	label,
	multiSelect = false,
	name,
	onChange,
	required = false,
	value = false,
	...ambient
}) => <Label {...ambient}>
	<Input
		{...{ value, name, onChange, required }}
		tabIndex={-1}
		type={multiSelect ? 'checkbox' : 'radio'}
	/>
	<Check
		aria-checked={value}
		icon={value ? faCheckSquare : faSquare}
		role="checkbox"
		tabIndex={0}
	/>
	<LabelText>{label}</LabelText>
</Label >;

Wrapper.propTypes = {
	label: PropTypes.string.isRequired,
	multiSelect: PropTypes.bool,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	required: PropTypes.bool,
	value: PropTypes.bool
};

export default Wrapper;
