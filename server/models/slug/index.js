import nano from 'nanoid/generate';

import config from '../../config';
import { db, loadQueries } from '../../db';
import rootLogger from '../../logger';

const logger = rootLogger.child({
	namespace: 'server:models:slug'
});

const sql = loadQueries('models/slug/queries');

const validate = (code, url) => {
	const errors = [];

	if (code && (code.length < config.slugCodeMinLength)) {
		errors.push({
			field: 'code',
			// eslint-disable-next-line max-len
			message: `Code must be at least ${config.slugCodeMinLength} characters long`
		});
	}

	if (!url) {
		errors.push({
			field: 'url',
			message: 'URL is required'
		});
	}

	if (url && url.startsWith(config.baseUrl)) {
		errors.push({
			field: 'url',
			message: 'URL must not start with server URL'
		});
	}

	if (errors.length) {
		const error = new Error('Invalid slug');

		error.details = errors;

		throw error;
	}
};

export const list = () => {
	logger.debug('Calling `list`');

	return db.manyOrNone(sql.list);
};

export const create = async (userId, code, url) => {
	logger.debug({
		userId,
		code,
		url
	}, 'Calling `create`');

	validate(code || '', url);

	if (code) {
		const slug = await get(code);

		if (slug) {
			if (slug.url === url) {
				return [slug, false];
			} else {
				throw new Error(`Code \`${code}\` is not unique`);
			}
		} else {
			const newSlug = await db.one(sql.create, {
				userId,
				code,
				url
			});

			return [newSlug, true];
		}
	} else {
		const slug = await db.oneOrNone(sql.findByURL, { userId, url });

		if (slug) {
			return [slug, false];
		} else {
			const newCode = await randomCode();

			const newSlug = await db.one(sql.create, {
				userId,
				code: newCode,
				url
			});

			return [newSlug, true];
		}
	}
};

export const get = (code) => {
	logger.debug({ code }, 'Calling `get`');

	return db.oneOrNone(sql.findByCode, { code });
}

export const loadUrl = (code) => {
	logger.debug({ code }, 'Calling `loadUrl`');

	return get(code).then(slug => slug ? slug.url : null);
}

export const randomCode = async (
	targetLength = config.slugCodeMinLength,
	attempts = 0
) => {
	logger.debug({ attempts, targetLength }, 'Calling `randomCode`');

	if (attempts >= config.slugCodePersistence) {
		return randomCode(targetLength + 1);
	}

	const proposal = nano(config.slugCodePool, targetLength);

	const slug = await get(proposal);

	return slug ? randomCode(targetLength, attempts + 1) : proposal;
};
