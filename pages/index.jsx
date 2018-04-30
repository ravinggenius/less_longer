import React from 'react';
import styled from 'react-emotion';

const P = styled.p`
	color: #03A9F4;
`;

export default class Index extends React.Component {
	static async getInitialProps({ req }) {
		if (req) {
			return Promise.resolve({ name: 'server' });
		} else {
			return Promise.resolve({ name: 'client' });
		}
	}

	render() {
		const { name } = this.props;

		return <P>Rendered on {name}.</P>;
	}
}
