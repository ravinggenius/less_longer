import PropTypes from 'prop-types';
import React from 'react';

import { fetchAuthenticated } from '../../client/browser';
import Layout from '../../components/layouts/LinearLayout';
import SlugForm from '../../components/slug_form';
import SlugsList from '../../components/slug_list';
import { H1, P } from '../../components/text';

export default class SlugsIndex extends React.Component {
	static defaultProps = {
		baseUrl: '',
		loading: true,
		slugs: []
	}

	static propTypes = {
		baseUrl: PropTypes.string.isRequired,
		loading: PropTypes.bool,
		slugs: PropTypes.arrayOf(PropTypes.shape({
			code: PropTypes.string.isRequired,
			id: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired
		})).isRequired
	}

	static async getInitialProps({ req, query }) {
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
	}

	render() {
		const { baseUrl, loading, slugs } = this.props;

		if (loading) {
			return <P>Loading slugs....</P>;
		}

		return <Layout header={<H1>Shortened URLs</H1>} title="Slugs">
			<SlugForm />

			<SlugsList {...{ baseUrl, slugs }} />
		</Layout>;
	}
}
