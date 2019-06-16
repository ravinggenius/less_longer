import PropTypes from 'prop-types';
import React from 'react';

const Errors = ({ messages }) => messages.length ? (
	<ul>
		{messages.map(message => <li key={message}>{message}</li>)}
	</ul>
) : null;

Errors.propTypes = {
	messages: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Errors;
