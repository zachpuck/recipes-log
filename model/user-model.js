'use strict';

const mongoose = require('mongoose');
// const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, lowercase: true },
  email: {type: String, required: true, lowercase: true},
  // password: {type: String, required: true},
});

module.exports = mongoose.model('user', userSchema);

