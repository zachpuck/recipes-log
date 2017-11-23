'use strict';

const faker = require('faker');
const User = require('../../model/user-model');

const mockUser = module.exports = {};

mockUser.createOne = () => {
  return new User({
    username: faker.internet.userName(),
    email: faker.internet.email(),
    //result.password = faker.internet.password();
  });
};

