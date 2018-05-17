import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import React from 'react';

import { fetchAuthenticatedBody, setToken } from '../../client/browser';
import Form, { Button } from '../../components/form';
import Input from '../../components/input';
import Layout, { SmallBody } from '../../components/layouts/LinearLayout';

class UserCreateForm extends React.Component {
	static propTypes = {
		action: PropTypes.string.isRequired
	}

	static getDerivedStateFromProps(
		{ username },
		{ displayUsername, displayPassword }
	) {
		return {
			displayPassword: displayPassword || '',
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
		const { displayPassword, displayUsername } = this.state;

		event.preventDefault();

		try {
			const { data } = await fetchAuthenticatedBody('POST', action, {
				password: displayPassword,
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
		const { displayPassword, displayUsername, error } = this.state;

		return <Layout title="Create User">
			<SmallBody>
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

					<Button type="submit">Create User</Button>
				</Form>
			</SmallBody>
		</Layout>;
	}
}

export default withRouter(UserCreateForm);
