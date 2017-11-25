'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  recipename: { type: String, required: true, unique: true},
  notes: {type: String},
});

module.exports = mongoose.model('recipe', recipeSchema);

