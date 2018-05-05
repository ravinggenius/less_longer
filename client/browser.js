export const clearToken = () => sessionStorage.removeItem('token');
export const getToken = () => sessionStorage.getItem('token');
export const setToken = (token) => sessionStorage.setItem('token', token);

export const fetchAuthenticated = async (method, path, options = {}) => {
	const response = await fetch(path, {
		method: method.toUpperCase(),
		headers: {
			'Accept': 'application/json',
			'Authorization': `Bearer ${getToken()}`,
			'Content-Type': 'application/json'
		},
		credentials: 'same-origin',
		redirect: 'follow',
		...options
	});

	if (response.ok) {
		return await response.json();
	} else {
		return Promise.reject(await response.json());
	}
};

export const fetchAuthenticatedBody = (
	method,
	path,
	body
) => fetchAuthenticated(method, path, {
	body: JSON.stringify(body)
});
