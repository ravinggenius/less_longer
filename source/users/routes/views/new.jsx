import React from 'react';

import { Errors, Form } from '../../../components';
import Layout from '../../../layout';

export default ({ error, username }) => <Layout title="New User">
	{error && <Errors details={error.details} message={error.message} />}

	<Form action="/u" method="post">
		<Form.Input label="Username" name="username" value={username} />
		<Form.Input label="Password" name="password" type="password" />

		<Form.Button type="submit">Save</Form.Button>
	</Form>
</Layout>;
