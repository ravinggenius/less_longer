import { withRouter } from 'next/router';
import React from 'react';

import { fetchAuthenticatedBody, setToken } from '../../client/browser';
import Form, { Button } from '../../components/form';
import Input from '../../components/input';
import Layout, { SmallBody } from '../../components/layouts/LinearLayout';

class LoginForm extends React.Component {
	static getDerivedStateFromProps(
		{ resume, username },
		{ displayUsername, displayPassword }
	) {
		return {
			action: resume ? '/l' : `/l?resume=${resume}`,
			displayPassword: displayPassword || '',
			displayUsername: displayUsername || username || ''
		};
	}

	static getInitialProps({ query }) {
		return query;
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
		const { resume, router } = this.props;
		const { action, displayPassword, displayUsername } = this.state;

		event.preventDefault();

		try {
			const { data } = await fetchAuthenticatedBody('POST', action, {
				password: displayPassword,
				username: displayUsername
			});

			setToken(data.token);

			router.replace(resume);
		} catch ({ error }) {
			this.setState(() => ({
				error
			}));
		}
	}

	render() {
		const { action, displayPassword, displayUsername, error } = this.state;

		return <Layout title="Login">
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

					<Button type="submit">Login</Button>
				</Form>
			</SmallBody>
		</Layout>;
	}
}

export default withRouter(LoginForm);
