import PropTypes from 'prop-types';
import React from 'react';

import P from './text/P';

const Errors = ({ details = [], message }) => (
	<div>
		<P>{message}</P>

		{details.length ? (
			<ul>
				{details.map(d => <li key={d.message}>{d.message}</li>)}
			</ul>
		) : null}
	</div>
);

Errors.propTypes = {
	details: PropTypes.arrayOf(PropTypes.shape({
		message: PropTypes.string.isRequired
	})),
	message: PropTypes.string.isRequired
};

export default Errors;
