import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { fetchAuthenticatedBody, setToken } from '../../client/browser';
import Button from '../../components/form/Button';
import Form from '../../components/form/Form';
import Input from '../../components/form/Input';
import Layout from '../../components/layouts/LinearLayout';

const UserNewPage = ({ action, error: errorDefault, router, username: usernameDefault }) => {
	const [error, setError] = useState(errorDefault);

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

			router.replace('/s');
		} catch ({ error }) {
			setError(error);
		}
	}

	return (
		<Layout title="Create User">
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

				<Input
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
	router: PropTypes.shape({}).isRequired,
	username: PropTypes.string
};

export default withRouter(UserNewPage);
