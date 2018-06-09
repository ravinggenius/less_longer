export default (error) => {
	if (typeof error === 'string') {
		return {
			message: error
		};
	}

	return {
		message: error.message,
		details: error.details
	};
};
