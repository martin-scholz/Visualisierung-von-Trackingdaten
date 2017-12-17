/*
model_index.js
version : 1.0.0
datum: 8.12.2017
autor : Martin Scholz
*/
var mongoose = require('mongoose');

// Mongoose Schema definition
var Schema = mongoose.Schema;
var JsonSchema = new Schema({
  type: Schema.Types.Mixed
});

var Json_in = mongoose.model('Json_in', JsonSchema, '_trips');
module.exports = Json_in;
