const React = require('react');

const { Errors, Form } = require('../../../components');
const Layout = require('../../../layout');

module.exports = ({ error, username }) => <Layout title="New User">
	{error && <Errors details={error.details} message={error.message} />}

	<Form action="/u" method="post">
		<Form.Input label="Username" name="username" value={username} />
		<Form.Input label="Password" name="password" type="password" />

		<Form.Button type="submit">Save</Form.Button>
	</Form>
</Layout>;
