const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const config = require('../config');

const loginRoutes = require('./logins/routes');
const slugRoutes = require('./slugs/routes');
const userRoutes = require('./users/routes');

const server = express();

server.use(helmet());

if (config.logFormat !== 'disabled') {
	server.use(morgan(config.logFormat));
}

server.get('/', (req, res) => res.redirect('/s'));

server.use(require('./slugs/redirector'));

server.use(bodyParser.json({
	strict: true
}));

server.use(bodyParser.urlencoded({
	extended: true
}));

server.use('/l', loginRoutes);
server.use('/s', slugRoutes);
server.use('/u', userRoutes);

server.use((req, res) => res.status(404));

module.exports = server;
