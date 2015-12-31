'use strict';

const User    = require('../../models/user');
const Bcrypt  = require('bcrypt');
const JWT     = require('jsonwebtoken');
const config  = require('../../config/constants');

exports.checkCredentials = (data) => {
  data = JSON.parse(data);
  return new Promise((resolve, reject) => {
    new User({email: data.email}).fetch().then((resp) => {
      if (!resp) { reject('User not exists.'); }
      let modelData = resp.toJSON();
      Bcrypt.compare(data.password, modelData.password, (err, isValid) => {
        if (isValid) {
          let jwt = JWT.sign({id: modelData.id, email: modelData.email}, config.token);
          resolve({status: true, jwt: jwt});
        } else {
          reject('Invalid credentials.');
        }
      });
    });
  });
};