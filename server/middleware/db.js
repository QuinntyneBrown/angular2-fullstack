'use strict';

const config = require('../config/constants');
const Knex = require('knex')({
  client: 'mysql',
  connection: {
    host      : config.db_host,
    port      : config.db_port,
    user      : config.db_user,
    password  : config.db_password,
    database  : config.db_name,
    charset   : 'utf8'
  }
});

const Bookshelf = require('bookshelf')(Knex);
Bookshelf.plugin('registry');
Bookshelf.plugin('virtuals');
Bookshelf.plugin('visibility');

module.exports = Bookshelf;