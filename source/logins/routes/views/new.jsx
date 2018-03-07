const React = require('react');

const { Errors, Form } = require('../../../components');
const Layout = require('../../../layout');

module.exports = ({ error, username }) => <Layout title="Login">
	{error && <Errors details={error.details} message={error.message} />}

	<Form action="/l" method="post">
		<Form.Input label="Username" name="username" value={username} />
		<Form.Input label="Password" name="password" type="password" />

		<Form.Button type="submit">Login</Form.Button>
	</Form>
</Layout>;
