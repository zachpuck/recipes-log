'use strict';

const User = require('../../model/user-model');

module.exports = () => {
  return Promise.all([
    User.remove({}),
  ]);
};