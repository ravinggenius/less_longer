import Router from 'next/router';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import * as API from '../../client/api';
import Button from '../../components/form/Button';
import Form, { METHODS } from '../../components/form/Form';
import Input from '../../components/form/Input';
import Layout from '../../components/layouts/LinearLayout';

const UserNewPage = ({
	errors: errorsInitial,
	routes,
	username: usernameInitial
}) => {
	const [errors, setErrors] = useState(errorsInitial);

	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');
	const [username, setUsername] = useState(usernameInitial);

	const handleSubmit = async (event) => {
		event.preventDefault();

		const {
			action,
			dataset: { intendedMethod: method }
		} = event.target;

		const response = await API.fetchJson({
			method,
			action
		}, {}, {
				password,
				passwordConfirmation,
				username
			});

		if (response.ok) {
			const { data } = await response.json();

			API.setToken(data.token);

			Router.push(response.headers.get('Location'));
		} else {
			const { errors } = await response.json();

			setErrors(errors);
		}
	}

	return (
		<Layout title="Create User">
			<Form
				errors={errors.base}
				onSubmit={handleSubmit}
				route={API.expandRoute(routes.userCreate)}
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

				<Input
					errors={errors.passwordConfirmation}
					label="Confirm"
					name="passwordConfirmation"
					onChange={({ target: { value } }) => setPasswordConfirmation(value)}
					type="password"
					value={passwordConfirmation}
				/>

				<Button type="submit">Create User</Button>
			</Form>
		</Layout>
	);
};

UserNewPage.getInitialProps = API.buildGetInitialProps();

UserNewPage.propTypes = {
	errors: PropTypes.shape({}).isRequired,
	routes: PropTypes.shape({
		userCreate: PropTypes.shape({
			action: PropTypes.string.isRequired,
			method: PropTypes.oneOf(METHODS).isRequired
		}).isRequired
	}).isRequired,
	username: PropTypes.string
};

export default UserNewPage;
