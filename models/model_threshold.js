/*
model_threshold.js
version : 1.0.0
datum: 8.12.2017
autor : Martin Scholz
*/
var mongoose = require('mongoose');

// Mongoose Schema definition
var Schema = mongoose.Schema;
var JsonSchema = new Schema({
  threshold:String
});
console.log("schema");
var Json_th = mongoose.model('Json_th', JsonSchema, '_threshold');

module.exports = Json_th;
