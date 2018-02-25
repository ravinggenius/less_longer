const React = require('react');

const Layout = require('../../../layout');

module.exports = ({ username }) => <Layout title="New User">
	<p>hello {username}</p>
</Layout>;
