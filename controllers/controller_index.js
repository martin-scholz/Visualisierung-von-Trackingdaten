/*
controller_index.js
version : 1.0.0
datum: 8.12.2017
autor : Martin Scholz
*/
var express = require('express');
var router = express.Router();

// Mongoose import
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectId;

var mongoose = require('mongoose')
var Json_in = require('../models/model_index');
module.exports.controller = function(app) {





  /*HTTP-get-Request home page. */
  app.get('/', function(req, res) {
    res.render('index', {
      title: 'Visualisierung von Trackingdaten'
    });
  });


  /* HTTP-GET-Request der die zu visuaklisierenden Daten aus der Datenbank holt */
  app.get('/getTrackdata', function(req, res) {
    Json_in.find({}, {
      'route': 1,
      'bicycle_uuid': 1,
      'started': 1,
      'ended': 1,
      'duration_sec': 1,
      'distance_m': 1
    }, function(err, docs) {
      //console.log(docs);
      res.json(docs);
    });
  });

}
