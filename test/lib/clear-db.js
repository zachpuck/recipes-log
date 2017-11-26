'use strict';

const User = require('../../model/user-model');
const Recipe = require('../../model/recipe-model');

module.exports = () => {
  return Promise.all([
    User.remove({}),
    Recipe.remove({}),
  ]);
};