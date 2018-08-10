import PropTypes from 'prop-types';
import React from 'react';

import { fetchAuthenticated } from '../../client/browser';
import Layout from '../../components/layouts/LinearLayout';
import SlugForm from '../../components/slug_form';
import SlugsList from '../../components/slug_list';
import { H1, P } from '../../components/text';

const SlugsIndex = ({ baseUrl, loading, slugs }) => {
	if (loading) {
		return <P>Loading slugs....</P>;
	}

	return <Layout header={<H1>Shortened URLs</H1>} title="Slugs">
		<SlugForm />

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
			slugs: query.slug ? [ query.slug ] : query.slugs
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
			slugs: [ slug ]
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
	slugs: PropTypes.arrayOf(PropTypes.shape({
		code: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired,
		url: PropTypes.string.isRequired
	})).isRequired
};

export default SlugsIndex;
