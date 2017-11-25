'use strict';

require('dotenv').config({ path: `${__dirname}/../.test.env`});

const expect = require('chai').expect;
const superagent = require('superagent');
const server = require('../lib/server');
const clearDB = require('./lib/clear-db');
const mockRecipe = require('./lib/mock-recipe');

const url = `http://localhost:${process.env.PORT}`;

describe('testing /api/recipe', () =>{
  before(server.start);
  afterEach(clearDB);
  after(server.stop);

  describe('testing POST /api/recipe', () => {
    let recipe = mockRecipe.createOne();

    it('with a valid request, it should respond with status 200', done => {
      superagent.post(`${url}/api/recipe/create`)
        .send({recipename: `${recipe.recipename}`, notes: `${recipe.notes}`})
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('with a valid request, it should create a recipe', done => {
      superagent.post(`${url}/api/recipe/create`)
        .send({recipename: `${recipe.recipename}`, notes: `${recipe.notes}`})
        .end((err, res) => {
          expect(res.body.recipename).to.exist;
          expect(res.body.notes).to.exist;
          expect(res.body._id).to.exist;
          expect(res.body.recipename).to.be.a('string');
          expect(res.body.notes).to.be.a('string');
          done();
        });
    });

    it('with an invalid request, it should respond with status 400', done => {
      superagent.post(`${url}/api/recipe/create`)
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
  });
});