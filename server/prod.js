'use strict';

const server = require('./server');
const config = require('./config/constants');

const options = {
  port: config.prod_port
};

server(options).start(() => {
  console.log('Server running at port', config.prod_port);
});