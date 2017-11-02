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



  app.post('/updateThreshold', function(req, res, next) {
    //console.log(req.body.threshold);
    var item = {
      threshold: req.body.threshold
    };
    console.log("Requestbody :" + req.body.threshold);
    //var id = ObjectId("59fa31a524a41d7f0c81a5a3");
    var id = ObjectId("59f767f9f36d282363088466");


    Json_th.updateOne({
      "_id": id
    }, {
      $set: item
    }, function(err, doc) {
      assert.equal(null, err);
      console.log('item updated');
      //doc.save();
      req.session.destroy();
      res.send({err: 0, redirectUrl: "/"});
      //res.redirect("/");
      console.log('redirect?');
    });
  });


  app.get('/getThreshold', function(req, res) {
    Json_th.findOne({
    //  "_id": ObjectId("59fa31a524a41d7f0c81a5a3")
      "_id": ObjectId("59f767f9f36d282363088466")
    }, function(err, doc) {
      res.json(doc);
    });
  });
}
