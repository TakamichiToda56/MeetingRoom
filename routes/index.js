var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var MeetingData = require('../db.js').MeetingData;

router.get('/', function(req, res, next) {
    MeetingData.find(function(err,docs){
      if(err){
        console.log(err);
      }
      if(docs.length==1){
        var ret = docs[0].schedule;
      }else{
        var ret = docs;
      }
      res.render('index', {
        title : 'インキュC会議室予約システム',
        datas : ret
      });
    });
});

router.post('/', function(req, res, next) {
  var schedule = req.body.schedule;
    MeetingData.find(function(err,docs){
      if(err){
        console.log(err);
      }
      MeetingData.remove({}, function(err) {});
      newDoc = new MeetingData({schedule : schedule});
      newDoc.save();
      res.redirect("/")
    });
});

module.exports = router;
