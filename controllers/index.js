var express = require('express');
var router = express.Router();

// Mongoose import
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectId;
//var index = require('../models/index');


var mongoose = require('mongoose')
var Json = require('../models/index');
module.exports.controller = function(app) {





/* GET home page. */
app.get('/', function(req, res) {
  res.render('index', {
    title: 'Visualisierung von Trackingdaten'
  });
});


/* GET layers json data. */
app.get('/trackdata', function(req, res) {
  Json.find({}, {
    'route': 1,
    'bicycle_uuid': 1,
    'started': 1,
    'ended': 1,
    'duration_sec': 1,
    'distance_m': 1
  }, function(err, docs) {
    //console.log(docs);
    res.json(docs);
  }).sort({
    'started': 1
  });
});


/* GET Map page. */

app.get('/map', function(req, res) {
  res.render('map', {
    lat: 52.521079,
    lng: 13.378048
  });
});
}
