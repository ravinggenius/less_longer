const express = require('express');

const routes = express.Router();

routes.get('/', (req, res) => res.redirect('/s'));

routes.get('/s', (req, res) => res.send('hello world from `/s`'));

module.exports = routes;
