var express = require('express');
var router = express.Router();

// Mongoose import
var mongoose = require('mongoose');

// Mongoose connection to MongoDB
//mongoose.connect('mongodb://localhost/trips', function (error) {
mongoose.connect('mongodb://hotomama:mamahoto0@ds143774.mlab.com:43774/trips', function (error) {
    if (error) {
        console.log(error);
    }
});

// Mongoose Schema definition
var Schema = mongoose.Schema;
var JsonSchema = new Schema({
    name: String,
    type: Schema.Types.Mixed
});

// Mongoose Model definition
var Json = mongoose.model('JString', JsonSchema, 'coords');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


/* GET layers json data. */
router.get('/trackdata', function (req, res) {
    Json.find({},{'route':1,
                  'bicycle_uuid':1,
                  'started':1,
                  'ended':1,
                  'duration_sec':1}, function (err, docs) {
      console.log(docs);
        res.json(docs);
    });
});

/* GET Map page. */

router.get('/map', function(req,res) {
        res.render('map', {
            lat : 52.521079,
            lng : 13.378048
        });
});




module.exports = router;
