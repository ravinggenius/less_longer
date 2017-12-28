const express = require('express');

const routes = require('./routes');

const server = express();

server.use('/', routes);

module.exports = server;
