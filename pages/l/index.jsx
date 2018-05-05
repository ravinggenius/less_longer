import Head from 'next/head';
import Router from 'next/router';
import React from 'react';

import { fetchAuthenticatedBody, setToken } from '../../client/browser';
import Errors from '../../components/feedback';
import Form, { Button, Input } from '../../components/form';

export default class LoginForm extends React.Component {
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
		const { resume } = this.props;
		const { action, displayPassword, displayUsername } = this.state;

		event.preventDefault();

		try {
			const { data } = await fetchAuthenticatedBody('POST', action, {
				password: displayPassword,
				username: displayUsername
			});

			setToken(data.token);

			Router.replace(resume);
		} catch (error) {
			this.setState(() => ({
				error
			}));
		}
	}

	render() {
		const { action, displayPassword, displayUsername, error } = this.state;

		return <Form {...{ action }} method="post" onSubmit={this.handleSubmit}>
			<Head>
				<title>Login | Less Longer</title>
			</Head>

			{error && <Errors {...{ error }} />}

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
		</Form>;
	}
}
