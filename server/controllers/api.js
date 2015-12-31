'use strict';

const ORM = require('../middleware/repos');

exports.checkCredentials = {
  handler: (request, reply) => {
    ORM.UserRepository.checkCredentials(request.payload).then((resp) => {
      return reply(resp);
    }, (err) => {
      return reply({status: false, msg: err});
    });
  }
};

