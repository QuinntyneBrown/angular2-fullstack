'use strict';

const ORM = require('../middleware/db');

module.exports = ORM.model('User', {
  tableName: 'users'
});