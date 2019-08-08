const data = new WeakMap();

class KeyedErrors extends Error {
	static serialize(error) {
		if (error instanceof KeyedErrors) {
			return error.asJSON();
		} else if (error instanceof Error) {
			return {
				base: [
					error.message
				]
			};
		} else if (typeof error === 'string') {
			return {
				base: [
					error
				]
			};
		} else {
			return error || {};
		}
	}

	constructor(...etc) {
		super(...etc);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, KeyedErrors);
		}

		this.name = 'KeyedErrors';

		data.set(this, {});
	}

	add(key, message) {
		const before = data.get(this);

		const after = {
			...before,
			[key]: [
				...(before[key] || []),
				message
			]
		};

		data.set(this, after);
	}

	asJSON() {
		return data.get(this);
	}

	hasErrors() {
		return Object.keys(data.get(this)).length > 0;
	}
}

export default KeyedErrors;
