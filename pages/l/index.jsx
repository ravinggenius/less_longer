import PropTypes from 'prop-types';
import Router from 'next/router';
import React, { useState } from 'react';

import * as API from '../../client/api';
import Button from '../../components/form/Button';
import Form, { METHODS } from '../../components/form/Form';
import Input from '../../components/form/Input';
import Layout from '../../components/layouts/LinearLayout';

const LoginPage = ({
	errors: errorsInitial,
	routes,
	username: usernameInitial
}) => {
	const [errors, setErrors] = useState(errorsInitial);

	const [username, setUsername] = useState(usernameInitial);
	const [password, setPassword] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();

		const response = await API.submitForm(event.target, {
			username,
			password
		});

		const body = await response.json();

		if (response.ok) {
			API.setToken(body.token);

			Router.push(response.headers.get('Location'));
		} else {
			setErrors(body.errors);
		}
	};

	return (
		<Layout title="Login">
			<Form
				errors={errors.base}
				onSubmit={handleSubmit}
				route={API.expandRoute(routes.loginCreate)}
			>
				<Input
					errors={errors.username}
					label="Username"
					name="username"
					onChange={({ target: { value } }) => setUsername(value)}
					value={username}
				/>

				<Input
					errors={errors.password}
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

LoginPage.getInitialProps = API.buildGetInitialProps();

LoginPage.propTypes = {
	errors: PropTypes.shape({
		base: PropTypes.arrayOf(PropTypes.string.isRequired),
		username: PropTypes.arrayOf(PropTypes.string.isRequired),
		password: PropTypes.arrayOf(PropTypes.string.isRequired)
	}).isRequired,
	routes: PropTypes.shape({
		loginCreate: PropTypes.shape({
			action: PropTypes.string.isRequired,
			method: PropTypes.oneOf(METHODS).isRequired
		}).isRequired
	}).isRequired,
	username: PropTypes.string
};

export default LoginPage;
