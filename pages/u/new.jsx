import Router from 'next/router';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { fetchAuthenticatedBody, setToken } from '../../client/browser';
import Button from '../../components/form/Button';
import Form from '../../components/form/Form';
import Input from '../../components/form/Input';
import Layout from '../../components/layouts/LinearLayout';

const UserNewPage = ({ action, errors: errorsDefault, username: usernameDefault }) => {
	const [errors, setErrors] = useState(errorsDefault);

	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');
	const [username, setUsername] = useState(usernameDefault || '');

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const { data } = await fetchAuthenticatedBody('POST', action, {
				password,
				passwordConfirmation,
				username
			});

			setToken(data.token);

			Router.push('/s');
		} catch ({ errors }) {
			setErrors(errors);
		}
	}

	return (
		<Layout title="Create User">
			<Form
				{...{ action }}
				errors={errors.base}
				method="post"
				onSubmit={handleSubmit}
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

UserNewPage.getInitialProps = ({ query }) => ({
	action: '/u',
	...query
});

UserNewPage.propTypes = {
	action: PropTypes.string.isRequired,
	errors: PropTypes.shape({}).isRequired,
	username: PropTypes.string
};

export default UserNewPage;
