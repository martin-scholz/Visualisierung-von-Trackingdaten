/*
controller_threshold.js
version : 1.0.0
datum: 8.12.2017
autor : Martin Scholz
*/
var express = require('express');
var router = express.Router();
var assert = require('assert');
var ObjectId = require('mongodb').ObjectId;
var Json_th = require('../models/model_threshold');
module.exports.controller = function(app) {


//HTTP-Post-Request zur änderung des Schwellenwertes
  app.post('/updateThreshold', function(req, res, next) {
    //console.log(req.body.threshold);
    var item = {
      threshold: req.body.threshold
    };
    console.log("Requestbody :" + req.body.threshold);
    var id = ObjectId("59fa31a524a41d7f0c81a5a3"); // local small
    //var id = ObjectId("59f767f9f36d282363088466"); //mlab Heroku
    //var id = ObjectId("59eb9f24daceff7db8dfdf61");


    Json_th.updateOne({
      "_id": id
    }, {
      $set: item
    }, function(err, doc) {
      assert.equal(null, err);
      console.log('item updated');
      req.session.destroy();

      //Redirect zur Index-Seite
      res.send({err: 0, redirectUrl: "/", item});

    });
  });

//HTTP-get-Request zum AUslesen des Schwellenwertes
  app.get('/getThreshold', function(req, res) {
    Json_th.findOne({
      "_id": ObjectId("59fa31a524a41d7f0c81a5a3")
      //"_id": ObjectId("59f767f9f36d282363088466") mLab Heroku
      //"_id": ObjectId("59eb9f24daceff7db8dfdf61")
    }, function(err, doc) {
      res.json(doc);
    });
  });
}
