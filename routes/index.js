var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var MeetingData = require('../db.js').MeetingData;

router.get('/', function(req, res, next) {
  // var id = req.query.id;
  // console.log("---");
  // console.log(id);
  // console.log("---");
  // if(id==null){
    MeetingData.find(function(err,docs){
      if(err){
        console.log(err);
      }
      console.log("------------");
      console.log(docs);
      console.log("------------");
      res.render('index', {
        title : 'インキュC会議室予約システム',
        datas : docs//,
        // errorMessage : ""
      });
    });
  // }else{
  //   MeetingData.findOne({
  //     '_id' : id
  //   },function(err,doc){
  //     if(err){
  //       console.log(err);
  //     }
  //     doc.remove();
  //     res.redirect("/");
  //   });
  // }
});

router.post('/', function(req, res, next) {
  var schedule = req.body.schedule;
  MeetingData.remove({});
  MeetingData.find(function(err,docs){
    if(err){
      console.log(err);
    }
    docs = new MeetingData({schedule : schedule});
    docs.save();
    res.render('index', {
      title : 'インキュC会議室予約システム',
      datas : docs
    });
  });
});

module.exports = router;
