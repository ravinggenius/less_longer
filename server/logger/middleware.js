const formatRequest = (req) => ({
	protocol: req.protocol,
	http: req.httpVersion,
	ip: req.ip,
	method: req.method,
	original: req.originalUrl,
	path: req.baseUrl + req.path,
	params: req.params,
	query: req.query,
	headers: req.headers
});

const formatResponse = (res) => ({
	statusCode: res.statusCode,
	statusMessage: res.statusMessage,
	headers: res._headers
});

const handleLogging = (startedAt, level, logger, req, res) => (error) => {
	const endedAt = new Date();

	if (error || (res.status >= 500)) {
		logger.error({
			requestTimeMs: endedAt - startedAt,
			request: formatRequest(req),
			response: formatResponse(res),
			error: error || new Error(`Failed with status code: ${res.statusCode}`)
		}, 'Request error');
	} else {
		logger[level(req, res)]({
			requestTimeMs: endedAt - startedAt,
			request: formatRequest(req),
			response: formatResponse(res)
		}, 'Request complete');
	}
};

const roarrExpress = ({ level = () => 'info', logger }) => (req, res, next) => {
	const startedAt = new Date();

	req.log = res.log = logger;

	res.on('finish', handleLogging(startedAt, level, logger, req, res));
	res.on('error', handleLogging(startedAt, level, logger, req, res));

	next();
};

export default roarrExpress;
