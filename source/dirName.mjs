import path from 'path';

export default ({ url }) => path.dirname(url.replace(/^file:\/\//, ''));
