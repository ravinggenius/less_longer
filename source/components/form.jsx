const React = require('react');

const Form = ({ action, children, method }) => <form {...{ action, method }}>
	{children}
</form>;

const Button = ({ children, type = 'button' }) => <button {...{ type }}>{children}</button>;

Form.Button = Button;

const Input = ({ label, name, required, type, value }) => <label>
	<span>{label}</span>
	<input {...{ name, required, type }} defaultValue={value} />
</label>;

Form.Input = Input;

module.exports = Form;
