'use strict';

require('dotenv').config({ path: `${__dirname}/../.test.env`});

//npm modules
const expect = require('chai').expect;
const superagent = require('superagent');

// //app modules
const User = require('../model/user-model');
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
    it('should respond with a user', () => {
      let user = mockUser.createOne();
      superagent.post(`${url}/api/signup`)
        .send({username: `${user.username}`, email: `${user.email}`})
        .end((err,res) => {
          expect(res.status).to.equal(200);
        });
    });
  });
});
