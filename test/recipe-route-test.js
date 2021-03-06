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
      superagent.post(`${url}/api/recipes`)
      // resources, favorite, dateCreated, photo
        .send({
          recipeName: `${recipe.recipeName}`, 
          notes: `${recipe.notes}`,
          resources: `${recipe.resources}`,
          favorite: `${recipe.favorite}`,
          dateCreated: `${recipe.dateCreated}`,
          photo: `${recipe.photo}`,
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('with a valid request, it should create a recipe', done => {
      superagent.post(`${url}/api/recipes`)
        .send({
          recipeName: `${recipe.recipeName}`, 
          notes: `${recipe.notes}`,
          resources: `${recipe.resources}`,
          favorite: `${recipe.favorite}`,
          dateCreated: `${recipe.dateCreated}`,
          photo: `${recipe.photo}`,
        })
        .end((err, res) => {
          expect(res.body._id).to.exist;
          expect(res.body.recipeName).to.exist;
          expect(res.body.notes).to.exist;
          expect(res.body.resources).to.exist;
          expect(res.body.favorite).to.exist;
          expect(res.body.dateCreated).to.exist;
          expect(res.body.photo).to.exist;
          expect(res.body.recipeName).to.be.a('string');
          expect(res.body.notes).to.be.a('string');
          expect(res.body.resources).to.be.a('string');
          expect(res.body.favorite).to.be.a('boolean');
          expect(res.body.dateCreated).to.be.a('string');
          expect(res.body.photo).to.be.a('string');
          done();
        });
    });

    it('with an invalid request, it should respond with status 400', done => {
      superagent.post(`${url}/api/recipes`)
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
  });

  describe('testing GET /api/recipe', () => {
    it('should fetch all recipes', () => {
      
      function checkData(arr) {
        return arr.map(item => {
          expect(item._id).to.exist;
          expect(item.recipeName).to.exist;
          expect(item.notes).to.exist;
          expect(item.resources).to.exist;
          expect(item.favorite).to.exist;
          expect(item.dateCreated).to.exist;
          expect(item.photo).to.exist;
          expect(item.recipeName).to.be.a('string');
          expect(item.notes).to.be.a('string');
          expect(item.resources).to.be.a('string');
          expect(item.favorite).to.be.a('boolean');
          expect(item.dateCreated).to.be.a('string');
          expect(item.photo).to.be.a('string');
        });
      }

      return mockRecipe.createMany()
        .then(() => {
          return superagent.get(`${url}/api/recipes`);
        })
        .then(res => {
          expect(res.body).to.be.an('Array');
          expect(res.body).to.have.lengthOf(3);
          expect(res.status).to.equal(200);
          checkData(res.body);
        });
    });

    it('with an invalid route, it should respond with status 404', done => {
      superagent.post(`${url}/api/recipe`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });
});