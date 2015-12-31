'use strict';

const Index = require('../controllers/index');

module.exports = [
  { method: 'GET', path: '/{url?}', config: Index }
];