var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var MeetingData = require('../db.js').MeetingData;

router.get('/', function(req, res, next) {
  var id = req.query.id;
  console.log("---");
  console.log(id);
  console.log("---");
  if(id==null){
    MeetingData.find(function(err,docs){
      if(err){
        console.log(err);
      }

      res.render('index', {
        title : 'インキュC会議室予約システム',
        datas : docs
      });
    });
  }else{
    MeetingData.findOne({
      '_id' : id
    },function(err,doc){
      if(err){
        console.log(err);
      }
      doc.remove();
      res.redirect("/");
    });
  }
});

router.post('/', function(req, res, next) {
  var date = req.body.date;
  var contents = req.body.contents;
  var name = req.body.name;
  var time = req.body.time;
  console.log(date);
  console.log(contents);
  console.log(name);
  console.log(time);
  MeetingData.find(function(err,docs){
    if(err){
      console.log(err);
    }
    newMeetingData = new MeetingData({
      name : name,
      date : date,
      time : time,
      content : contents
    })
    newMeetingData.save();
    docs.push(newMeetingData);
    res.render('index', {
      title : 'インキュC会議室予約システム',
      datas : docs
    });
  });
});

module.exports = router;
