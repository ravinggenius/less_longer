import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Router from 'next/router';
import React, { useState } from 'react';

import { fetchAuthenticated, fetchAuthenticatedBody } from '../../client/browser';
import Button from '../../components/form/Button';
import Form from '../../components/form/Form';
import Input from '../../components/form/Input';
import Toggle from '../../components/form/Toggle';
import Layout from '../../components/layouts/LinearLayout';
import SlugsList from '../../components/SlugList';
import H1 from '../../components/text/H1';
import P from '../../components/text/P';

const URLInput = styled(Input)`
	> input {
		font-size: 40px;
	}
`;

const SlugsIndexPage = ({ baseUrl, errors: errorsDefault, loading, slugs }) => {
	const [errors, setErrors] = useState(errorsDefault);

	const [customize, setCustomize] = useState(false);
	const [code, setCode] = useState('')
	const [url, setURL] = useState('')

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const { data } = await fetchAuthenticatedBody('POST', '/s', {
				code: customize ? code : '',
				url: url
			});

			setErrors(null);

			setCode('')
			setURL('')

			Router.push(`/s/${data.code}`);
		} catch ({ errors }) {
			setErrors(errors);
		}
	};

	if (loading) {
		return (
			<Layout header={<H1>Shortened URLs</H1>} title="Slugs">
				<P>Loading slugs....</P>
			</Layout>
		);
	}

	return (
		<Layout header={<H1>Shortened URLs</H1>} title="Slugs">
			<Form
				action="/s"
				errors={errors.base}
				method="post"
				onSubmit={handleSubmit}
			>
				<URLInput
					errors={errors.url}
					label="URL"
					name="url"
					onChange={({ target: { value } }) => setURL(value)}
					type="url"
					value={url}
				/>

				<Input
					disabled={!customize}
					errors={errors.code}
					label="Code"
					name="code"
					onChange={({ target: { value } }) => setCode(value)}
					value={code}
				/>

				<div css={`
					align-items: center;
					display: flex;
				`}>
					<Toggle
						label="Customize Code?"
						multiSelect
						name="customize"
						onChange={({ target: { checked } }) => setCustomize(checked)}
						value={customize}
					/>

					<Button type="submit">Lessify!</Button>
				</div>
			</Form>

			<SlugsList {...{ baseUrl, slugs }} />
		</Layout>
	);
};

SlugsIndexPage.getInitialProps = async ({ req, query }) => {
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

SlugsIndexPage.propTypes = {
	baseUrl: PropTypes.string.isRequired,
	errors: PropTypes.shape({}).isRequired,
	loading: PropTypes.bool,
	slugs: PropTypes.arrayOf(PropTypes.shape({
		code: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired,
		url: PropTypes.string.isRequired
	})).isRequired
};

export default SlugsIndexPage;
