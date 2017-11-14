'use strict';

require('dotenv').load();
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser').json();

const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true});

app.use(cors());
app.use(bodyParser);
app.use(morgan('dev')); //logging util
//TODO: load error middleware

//TODO: load routes

app.listen(port, () => console.log(`listening on ${port}`));