import React from 'react';

import Layout from '../../../layout';

export default ({ slugs }) => <Layout title="Listing Slugs">
	{slugs.length ? <ul>
		{slugs.map(({ id, code, url }) => <li key={id}>
			<span>{code}</span>
			<span>{url}</span>
		</li>)}
	</ul> : <p>No slugs to list</p>}
</Layout>;
