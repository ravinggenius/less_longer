import PropTypes from 'prop-types';
import React from 'react';

export const Button = ({
	children,
	type = 'button'
}) => <button {...{ type }}>{children}</button>;

Button.propTypes = {
	children: PropTypes.node.isRequired,
	type: PropTypes.string
};

export const Input = ({
	label,
	name,
	onChange,
	required = false,
	type = 'text',
	value
}) => <label>
	<span>{label}</span>
	<input {...{ name, onChange, required, type }} defaultValue={value} />
</label>;

Input.propTypes = {
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	required: PropTypes.bool,
	type: PropTypes.string,
	value: PropTypes.string.isRequired
};

const Form = ({
	action,
	children,
	method,
	onSubmit
}) => <form {...{ action, method, onSubmit }}>
	{children}
</form>;

Form.propTypes = {
	action: PropTypes.string.isRequired,
	children: PropTypes.arrayOf(PropTypes.element).isRequired,
	method: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired
};

export default Form;
