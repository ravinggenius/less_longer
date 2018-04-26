import React from 'react';

import { Errors, Form } from '../../../components';
import Layout from '../../../layout';

export default ({ error, username }) => <Layout title="Login">
	{error && <Errors details={error.details} message={error.message} />}

	<Form action="/l" method="post">
		<Form.Input label="Username" name="username" value={username} />
		<Form.Input label="Password" name="password" type="password" />

		<Form.Button type="submit">Login</Form.Button>
	</Form>
</Layout>;
