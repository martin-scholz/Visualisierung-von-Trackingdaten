var mongoose = require('mongoose');

// Mongoose Schema definition
var Schema = mongoose.Schema;
var JsonSchema = new Schema({
  type: Schema.Types.Mixed
});

var Json_in = mongoose.model('Json_in', JsonSchema, '_trip');
module.exports = Json_in;
