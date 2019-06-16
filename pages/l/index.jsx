import PropTypes from 'prop-types';
import Router from 'next/router';
import React, { useState } from 'react';

import { fetchAuthenticatedBody, setToken } from '../../client/browser';
import Button from '../../components/form/Button';
import Form from '../../components/form/Form';
import Input from '../../components/form/Input';
import Layout from '../../components/layouts/LinearLayout';

const LoginPage = ({ action, error: errorDefault, resume, username: usernameDefault }) => {
	const [error, setError] = useState(errorDefault);

	const [username, setUsername] = useState(usernameDefault || '');
	const [password, setPassword] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const { data } = await fetchAuthenticatedBody('POST', action, {
				password,
				username
			});

			setToken(data.token);

			Router.push(resume);
		} catch ({ error }) {
			setError(error);
		}
	};

	return (
		<Layout title="Login">
			<Form
				{...{ action, error }}
				method="post"
				onSubmit={handleSubmit}
			>
				<Input
					label="Username"
					name="username"
					onChange={({ target: { value } }) => setUsername(value)}
					value={username}
				/>

				<Input
					label="Password"
					name="password"
					onChange={({ target: { value } }) => setPassword(value)}
					type="password"
					value={password}
				/>

				<Button type="submit">Login</Button>
			</Form>
		</Layout>
	);
};

LoginPage.defaultProps = {
	error: {}
};

LoginPage.getInitialProps = ({ query }) => ({
	action: query.resume ? '/l' : `/l?resume=${query.resume}`,
	...query
});

LoginPage.propTypes = {
	action: PropTypes.string.isRequired,
	error: PropTypes.shape({}).isRequired,
	resume: PropTypes.string.isRequired,
	routes: PropTypes.shape({
		login: PropTypes.shape({
			method: PropTypes.string.isRequired,
			action: PropTypes.string.isRequired
		}).isRequired
	}).isRequired,
	username: PropTypes.string
};

export default LoginPage;
