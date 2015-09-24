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
  //console.log(schedule);
  //MeetingData.remove({}, function(err) {
    MeetingData.find(function(err,docs){
      if(err){
        console.log(err);
      }
      MeetingData.remove({}, function(err) {});
      newDoc = new MeetingData({schedule : schedule});
      //console.log(newDoc.schedule);
      newDoc.save();
      res.redirect("/")
    });
  //});

  // MeetingData.find(function(err,docs){
  //   if(err){
  //     console.log(err);
  //   }
  //   console.log(docs);
  //   var newDoc = new MeetingData({schedule : schedule});
  //   newDoc.save();
  //   //docs.save();
  //   console.log(docs);
  //   var res = ""
  //   for(i = 0; i < docs.length; i++){
  //     res += docs[i].schedule
  //   }
  //   console.log(res);
  //   res.render('index', {
  //     title : 'インキュC会議室予約システム',
  //     datas : res
  //   });
  // });
});

module.exports = router;
