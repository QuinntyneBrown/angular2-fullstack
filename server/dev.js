'use strict';

const initServer  = require('./server');
const config      = require('./config/constants');

module.exports = initServer({ port: config.dev_port });