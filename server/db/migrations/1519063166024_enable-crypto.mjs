export const up = (pgm) => {
	pgm.createExtension('pgcrypto');
};

export const down = (pgm) => {
	pgm.dropExtension('pgcrypto');
};
