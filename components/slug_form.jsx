import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import React from 'react';

import { fetchAuthenticatedBody } from '../client/browser';

import Form, { Button } from './form';
import Input from './input';
import Toggle from './toggle';

const URLInput = styled(Input)`
	> input {
		font-size: 40px;
	}
`;

class SlugForm extends React.Component {
	static propTypes = {
		router: PropTypes.shape({}).isRequired
	}

	state = {
		customize: false,
		displayCode: '',
		displayURL: ''
	}

	handleChange = (fieldname) => ({ target: { value } }) => {
		this.setState(() => ({
			[fieldname]: value
		}));
	}

	handleToggle = (fieldname) => () => {
		this.setState((previous) => ({
			[fieldname]: !previous[fieldname]
		}));
	}

	handleSubmit = async (event) => {
		const { router } = this.props;
		const {
			customize,
			displayCode,
			displayURL
		} = this.state;

		event.preventDefault();

		try {
			const { data } = await fetchAuthenticatedBody('POST', '/s', {
				code: customize ? displayCode : '',
				url: displayURL
			});

			this.setState(() => ({
				displayCode: '',
				displayURL: '',
				error: null
			}));

			router.replace(`/s/${data.code}`);
		} catch ({ error }) {
			this.setState(() => ({
				error
			}));
		}
	}

	render() {
		const {
			customize,
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
				disabled={!customize}
				label="Code"
				name="code"
				onChange={this.handleChange('displayCode')}
				value={displayCode}
			/>

			<div css={`
				align-items: center;
				display: flex;
			`}>
				<Toggle
					label="Customize Code?"
					multiSelect
					name="customize"
					onChange={this.handleToggle('customize')}
					value={customize}
				/>

				<Button type="submit">Lessify!</Button>
			</div>
		</Form >;
	}
}

export default withRouter(SlugForm);
