'use strict';

const Public = require('../controllers/public');
const Api = require('../controllers/api');

module.exports = [
  { method: 'GET',  path: '/assets/{param*}',       config: Public.assets        },
  { method: 'GET',  path: '/node_modules/{param*}', config: Public.modules       },
  { method: 'GET',  path: '/semantic/{param*}',     config: Public.semantic      },
  { method: 'POST', path: '/api/check-credentials', config: Api.checkCredentials }
];