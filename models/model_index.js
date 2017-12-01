var mongoose = require('mongoose');


// Mongoose Schema definition
var Schema = mongoose.Schema;
var JsonSchema = new Schema({
  // name: String,
  // type: Schema.Types.Mixed
});
console.log("schema");
//var Json = mongoose.model('JString0', JsonSchema, '_noadata');
//var Json = mongoose.model('JString0', JsonSchema, '_trips2000');
var Json_in = mongoose.model('Json_in', JsonSchema, '_trip');
module.exports = Json_in;
