'use strict';

const path = require('path');
const fs = require('fs');
const Boom = require('boom');

module.exports = {
  handler: (request, reply) => {
    const file = path.resolve(__dirname, '..', '..', 'dist', 'index.html');
    if (fs.existsSync(file)) {
      return reply.file(file);
    }
    else {
      return reply(Boom.notFound('Index file not found.'));
    }
  }
};