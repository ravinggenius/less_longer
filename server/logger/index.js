import serializeError from '@roarr/middleware-serialize-error';
import roarr from 'roarr';

import meta from '../../package';

const rootLogger = roarr.child({
	package: meta.name
}).child(serializeError());

export default rootLogger;
