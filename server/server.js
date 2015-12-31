'use strict';

const Hapi  = require('hapi');
const Inert = require('inert');

const initServer = (options) => {
  const server = new Hapi.Server();

  server.connection(options);
  server.register(Inert, (err) => {});
  server.route(require('./routes/index'));
  server.route(require('./routes/public'));
  server.route(require('./routes/authenticated'));

  return server;
};

module.exports = (options) => {
  options.routes = { cors: true };
  return initServer(options);
};