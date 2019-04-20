import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';

import { fetchAuthenticatedBody, setToken } from '../../client/browser';
import Button from '../../components/form/Button';
import Form from '../../components/form/Form';
import Input from '../../components/form/Input';
import Layout from '../../components/layouts/LinearLayout';

class UserCreateForm extends React.Component {
	static propTypes = {
		action: PropTypes.string.isRequired,
		router: PropTypes.shape({}).isRequired,
		username: PropTypes.string
	}

	static getDerivedStateFromProps(
		{ username },
		{ displayUsername, displayPassword, displayPasswordConfirmation }
	) {
		return {
			displayPassword: displayPassword || '',
			displayPasswordConfirmation: displayPasswordConfirmation || '',
			displayUsername: displayUsername || username || ''
		};
	}

	static getInitialProps({ query }) {
		return {
			action: '/u',
			...query
		};
	}

	state = {
		displayPassword: '',
		displayUsername: ''
	}

	handleChange = (fieldName) => ({ target: { value } }) => {
		this.setState(() => ({
			[fieldName]: value
		}));
	}

	handleSubmit = async (event) => {
		const { action, router } = this.props;
		const {
			displayPassword,
			displayPasswordConfirmation,
			displayUsername
		} = this.state;

		event.preventDefault();

		try {
			const { data } = await fetchAuthenticatedBody('POST', action, {
				password: displayPassword,
				passwordConfirmation: displayPasswordConfirmation,
				username: displayUsername
			});

			setToken(data.token);

			router.replace('/s');
		} catch ({ error }) {
			this.setState(() => ({
				error
			}));
		}
	}

	render() {
		const { action } = this.props;
		const {
			displayPassword,
			displayPasswordConfirmation,
			displayUsername,
			error
		} = this.state;

		return <Layout title="Create User">
			<Form
				{...{ action, error }}
				method="post"
				onSubmit={this.handleSubmit}
			>
				<Input
					label="Username"
					name="username"
					onChange={this.handleChange('displayUsername')}
					value={displayUsername}
				/>

				<Input
					label="Password"
					name="password"
					onChange={this.handleChange('displayPassword')}
					type="password"
					value={displayPassword}
				/>

				<Input
					label="Confirm"
					name="passwordConfirmation"
					onChange={this.handleChange(
						'displayPasswordConfirmation'
					)}
					type="password"
					value={displayPasswordConfirmation}
				/>

				<Button type="submit">Create User</Button>
			</Form>
		</Layout>;
	}
}

export default withRouter(UserCreateForm);
