import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React from 'react';

import * as API from '../../client/api';
import Input from '../../components/form/Input';
import Layout from '../../components/layouts/LinearLayout';
import H1 from '../../components/text/H1';

const URLInput = styled(Input)`
	> input {
		font-size: 40px;
	}
`;

const SlugsShowPage = ({ baseUrl, slug }) => {
	return (
		<Layout header={<H1>Shortened URLs</H1>} title="Slugs">
			<URLInput
				disabled
				label="URL"
				name="url"
				onChange={() => null}
				type="url"
				value={slug.url}
			/>

			<Input
				disabled
				label="Code"
				name="code"
				onChange={() => null}
				value={slug.code}
			/>
		</Layout>
	);
};

SlugsShowPage.getInitialProps = API.buildGetInitialProps();

SlugsShowPage.propTypes = {
	baseUrl: PropTypes.string.isRequired,
	slug: PropTypes.shape({
		code: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired,
		url: PropTypes.string.isRequired
	})
};

export default SlugsShowPage;
