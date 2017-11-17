var mongoose = require('mongoose');

// Mongoose Schema definition
var Schema = mongoose.Schema;
var JsonSchema = new Schema({
  threshold:String
});
console.log("schema");
var Json_th = mongoose.model('Json_th', JsonSchema, '_threshold');

module.exports = Json_th;
