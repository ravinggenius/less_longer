import URITemplate from 'es6-url-template';

export const clearToken = () => sessionStorage.removeItem('token');
export const getToken = () => sessionStorage.getItem('token');
export const setToken = (token) => sessionStorage.setItem('token', token);

export const expandRoute = (route, expansion = {}) => ({
	method: route.method,
	action: new URITemplate(route.action).expand(expansion)
});

export const fetchJson = (route, payload = null, options = {}) => {
	const { method, action: path } = route;

	const body = payload ? {
		body: JSON.stringify(payload)
	} : {}

	return fetch(path, {
		method,
		headers: {
			'Accept': 'application/json',
			'Authorization': `Bearer ${getToken()}`,
			'Content-Type': 'application/json'
		},
		credentials: 'same-origin',
		redirect: 'follow',
		...body,
		...options
	})
};

export const fetchJsonForPage = async (pathname) => {
	const response = await fetchJson({
		method: 'GET',
		action: pathname
	});

	return response.json();
};

export const buildGetInitialProps = () => ({ asPath, query, req }) => req
	? query
	: fetchJsonForPage(asPath);
