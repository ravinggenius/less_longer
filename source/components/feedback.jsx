import React from 'react';

const Errors = ({ details = [], message }) => <div>
	<p>{message}</p>

	{details.length ? <ul>
		{details.map(d => <li key={d.message}>{d.message}</li>)}
	</ul> : null}
</div>;

export default Errors;
