'use strict';

require('dotenv').load();
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const debug = require('debug')('recipes:server');
const bodyParser = require('body-parser').json();
const errorHandler = require('./lib/error-middleware');

const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true});

app.use(cors());
app.use(bodyParser);
app.use(morgan('dev')); 
app.use(errorHandler); //include below all app.use calls 

//TODO: load routes

app.listen(port, () => console.log(`listening on ${port}`));