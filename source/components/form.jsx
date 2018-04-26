import React from 'react';

export const Button = ({ children, type = 'button' }) => <button {...{ type }}>{children}</button>;

export const Input = ({ label, name, required, type, value }) => <label>
	<span>{label}</span>
	<input {...{ name, required, type }} defaultValue={value} />
</label>;

const Form = ({ action, children, method }) => <form {...{ action, method }}>
	{children}
</form>;

export default Form;
