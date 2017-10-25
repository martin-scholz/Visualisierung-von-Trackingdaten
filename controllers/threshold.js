var express = require('express');
var router = express.Router();
var assert = require('assert');
// Mongoose import
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectId;
//var index = require('../models/index');


var mongoose = require('mongoose')
var Json_th = require('../models/threshold');
module.exports.controller = function(app) {



  app.post('/update', function(req, res, next) {
    //console.log(req.body.threshold);
    var item = {
      threshold: req.body.threshold
    };
    var id = ObjectId("59eb95badaceff7db8dfdf60");


    Json_th.updateOne({
      "_id": id
    }, {
      $set: item
    }, function(err, doc) {
      assert.equal(null, err);
      console.log('item updated');
      //doc.save();
      res.redirect("/");
    });
  });


  app.get('/getThreshold', function(req, res) {
    Json_th.findOne({
      "_id": ObjectId("59eb95badaceff7db8dfdf60")
    }, function(err, doc) {
      res.json(doc);
    });
  });
}
