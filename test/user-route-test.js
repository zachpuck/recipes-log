'use strict';

require('dotenv').config({ path: `${__dirname}/../.test.env`});

//npm modules
const expect = require('chai').expect;
const superagent = require('superagent');

// //app modules
// const User = require('../model/user-model');
const server = require('../lib/server');
const clearDB = require('./lib/clear-db');
const mockUser = require('./lib/mock-user');

// //module constants
const url = `http://localhost:${process.env.PORT}`;

describe('testing /api/user', () =>{
  before(server.start);
  afterEach(clearDB);
  after(server.stop);
  
  describe('testing POST /api/user', () => {
    let user = mockUser.createOne();

    it('with a valid request, it should respond with status 200', done => {
      superagent.post(`${url}/api/signup`)
        .send({username: `${user.username}`, email: `${user.email}`})
        .end((err,res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('with a valid request, it should create a user', done => {
      superagent.post(`${url}/api/signup`)
        .send({ username: `${user.username}`, email: `${user.email}` })
        .end((err, res) => {
          expect(res.body.username).to.exist;
          expect(res.body.email).to.exist;
          expect(res.body._id).to.exist;
          expect(res.body.username).to.be.a('string');
          expect(res.body.email).to.be.a('string');
          done();
        });
    });

    it('with a invalid request, it should response with status 400', done => {
      superagent.post(`${url}/api/signup`)
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
  });
});
