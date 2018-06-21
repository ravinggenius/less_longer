import { withRouter } from 'next/router';
import React from 'react';
import styled from 'react-emotion';

import { fetchAuthenticatedBody } from '../client/browser';

import Form, { Button } from './form';
import Input from './input';

const URLInput = styled(Input)`
	> input {
		font-size: 40px;
	}
`;

class SlugForm extends React.Component {
	state = {
		displayCode: '',
		displayURL: ''
	}

	handleChange = (fieldname) => ({ target: { value } }) => {
		this.setState(() => ({
			[fieldname]: value
		}));
	}

	handleSubmit = async (event) => {
		const { router } = this.props;
		const {
			displayCode,
			displayURL
		} = this.state;

		event.preventDefault();

		try {
			const { data } = await fetchAuthenticatedBody('POST', '/s', {
				code: displayCode,
				url: displayURL
			});

			this.setState(() => ({
				displayCode: '',
				displayURL: '',
				error: null
			}));

			router.replace(`/s/${data.code}`);
		} catch (error) {
			this.setState(() => ({
				error
			}));
		}
	}

	render() {
		const {
			displayCode,
			displayURL,
			error
		} = this.state;

		return <Form
			{...{ error }}
			action="/s"
			method="post"
			onSubmit={this.handleSubmit}
		>
			<URLInput
				label="URL"
				name="url"
				onChange={this.handleChange('displayURL')}
				type="url"
				value={displayURL}
			/>

			<Input
				label="Code"
				name="code"
				onChange={this.handleChange('displayCode')}
				value={displayCode}
			/>

			<Button type="submit">Lessify!</Button>
		</Form>;
	}
}

export default withRouter(SlugForm);
