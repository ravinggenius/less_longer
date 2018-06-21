import PropTypes from 'prop-types';
import React from 'react';

import { fetchAuthenticated } from '../../client/browser';
import Layout from '../../components/layouts/LinearLayout';
import { H1, P } from '../../components/text';

export default class SlugsIndex extends React.Component {
	static defaultProps = {
		loading: true,
		slugs: []
	}

	static propTypes = {
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
				loading: false,
				slugs: query.slugs
			};
		}

		const { data } = await fetchAuthenticated('GET', '/s');

		return {
			loading: false,
			slugs: data.slugs
		};
	}

	render() {
		const { loading, slugs } = this.props;

		if (loading) {
			return <P>Loading slugs....</P>;
		}

		return <Layout header={<H1>Shortened URLs</H1>} title="Slugs">
			{slugs.length ? <ul>
				{slugs.map(({ id, code, url }) => <li key={id}>
					<span>{code}</span>
					<span>{url}</span>
				</li>)}
			</ul> : <P>No slugs to list</P>}
		</Layout>;
	}
}
