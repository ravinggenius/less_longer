import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Router from 'next/router';
import React, { useState } from 'react';

import * as API from '../../client/api';
import Button from '../../components/form/Button';
import Form, { METHODS } from '../../components/form/Form';
import Input from '../../components/form/Input';
import Toggle from '../../components/form/Toggle';
import Layout from '../../components/layouts/LinearLayout';
import SlugsList from '../../components/SlugList';
import H1 from '../../components/text/H1';

const URLInput = styled(Input)`
	> input {
		font-size: 40px;
	}
`;

const SlugsIndexPage = ({
	baseUrl,
	code: codeInitial,
	customize: customizeInitial,
	errors: errorsInitial,
	routes,
	slugs,
	url: urlInitial
}) => {
	const [errors, setErrors] = useState(errorsInitial);

	const [customize, setCustomize] = useState(customizeInitial);
	const [code, setCode] = useState(codeInitial);
	const [url, setURL] = useState(urlInitial);

	const handleSubmit = async (event) => {
		event.preventDefault();

		const {
			action,
			dataset: { intendedMethod: method }
		} = event.target;

		const response = await API.fetchJson({
			method,
			action
		}, {
				code,
				customize,
				url
			});

		if (response.ok) {
			Router.push(response.headers.get('Location'));
		} else {
			setErrors(errors);
		}
	};

	return (
		<Layout header={<H1>Shortened URLs</H1>} title="Slugs">
			<Form
				errors={errors.base}
				onSubmit={handleSubmit}
				route={API.expandRoute(routes.slugCreate)}
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

SlugsIndexPage.getInitialProps = API.buildGetInitialProps();

SlugsIndexPage.propTypes = {
	baseUrl: PropTypes.string.isRequired,
	code: PropTypes.string.isRequired,
	customize: PropTypes.bool.isRequired,
	errors: PropTypes.shape({}).isRequired,
	routes: PropTypes.shape({
		slugCreate: PropTypes.shape({
			action: PropTypes.string.isRequired,
			method: PropTypes.oneOf(METHODS).isRequired
		}).isRequired
	}).isRequired,
	slugs: PropTypes.arrayOf(PropTypes.shape({
		code: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired,
		url: PropTypes.string.isRequired
	})).isRequired,
	url: PropTypes.string.isRequired
};

export default SlugsIndexPage;
