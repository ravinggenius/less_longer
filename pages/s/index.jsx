import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import React from 'react';

import { fetchAuthenticated, fetchAuthenticatedBody } from '../../client/browser';
import Button from '../../components/form/Button';
import Form from '../../components/form/Form';
import Input from '../../components/form/Input';
import Toggle from '../../components/form/Toggle';
import Layout from '../../components/layouts/LinearLayout';
import SlugsList from '../../components/SlugList';
import { H1, P } from '../../components/Text';

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

const SlugsIndex = ({ baseUrl, loading, router, slugs }) => {
	if (loading) {
		return <P>Loading slugs....</P>;
	}

	return <Layout header={<H1>Shortened URLs</H1>} title="Slugs">
		<SlugForm {...{ router }} />

		<SlugsList {...{ baseUrl, slugs }} />
	</Layout>;
};

SlugsIndex.defaultProps = {
	baseUrl: '',
	loading: true,
	slugs: []
};

SlugsIndex.getInitialProps = async ({ req, query }) => {
	if (req) {
		return {
			baseUrl: query.baseUrl,
			loading: false,
			slugs: query.slug ? [query.slug] : query.slugs
		};
	}

	if (query.slugCode) {
		const { baseUrl, slug } = await fetchAuthenticated(
			'GET',
			`/s/${query.slugCode}`
		);

		return {
			baseUrl,
			loading: false,
			slugs: [slug]
		};
	} else {
		const { baseUrl, slugs } = await fetchAuthenticated('GET', '/s');

		return {
			baseUrl,
			loading: false,
			slugs
		};
	}
};

SlugsIndex.propTypes = {
	baseUrl: PropTypes.string.isRequired,
	loading: PropTypes.bool,
	router: PropTypes.shape({}).isRequired,
	slugs: PropTypes.arrayOf(PropTypes.shape({
		code: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired,
		url: PropTypes.string.isRequired
	})).isRequired
};

export default withRouter(SlugsIndex);
