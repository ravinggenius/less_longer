import PropTypes from 'prop-types';
import Head from 'next/head';
import Router from 'next/router';
import React from 'react';

import { fetchAuthenticatedBody, setToken } from '../../client/browser';
import Errors from '../../components/feedback';
import Form, { Button, Input } from '../../components/form';

export default class UserCreateForm extends React.Component {
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
		const { action } = this.props;
		const { displayPassword, displayUsername } = this.state;

		event.preventDefault();

		try {
			const { data } = await fetchAuthenticatedBody('POST', action, {
				password: displayPassword,
				username: displayUsername
			});

			setToken(data.token);

			Router.replace('/s');
		} catch (error) {
			this.setState(() => ({
				error
			}));
		}
	}

	render() {
		const { action } = this.props;
		const { displayPassword, displayUsername, error } = this.state;

		return <Form {...{ action }} method="post" onSubmit={this.handleSubmit}>
			<Head>
				<title>Create User | Less Longer</title>
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

			<Button type="submit">Create User</Button>
		</Form>;
	}
}
