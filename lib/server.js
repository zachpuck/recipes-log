'use strict';

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser').json();
const errorHandler = require('./error-middleware');

const authRoute = require('../route/auth-route');

const app = express();
const router = express.Router();
// const port = process.env.PORT || 3000;

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true});

app.use(cors());
app.use(bodyParser);
app.use(morgan('dev')); 

//TODO: load routes
app.use('/api', authRoute(router));
app.use(errorHandler); //include below all app.use calls 

//server start and stop
const server = module.exports = {};
server.isOn = false;
server.start = () => {
  return new Promise((resolve, reject) => {
    if(!server.isOn) {
      server.http = app.listen(process.env.PORT, () => {
        server.isOn = true;
        console.log('server up', process.env.PORT);
        resolve();
      });
      return;
    }
    reject(new Error('server already running'));
  });
};

server.stop = () => {
  return new Promise((resolve, reject) => {
    if(server.http && server.isOn) {
      return server.http.close(() => {
        server.isOn = false;
        console.log('server down');
        resolve();
      });
    }
    reject(new Error('the server is not running'));
  });
};