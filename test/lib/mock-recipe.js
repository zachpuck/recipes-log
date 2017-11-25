'use strict';

const faker = require('faker');
const Recipe = require('../../model/recipe-model');

const mockRecipe = module.exports = {};

mockRecipe.createOne = () => {
  return new Recipe({
    recipename: faker.lorem.word(),
    notes: faker.lorem.words(),
  });
};