var mongoose = require('mongoose');
var  Schema = mongoose.Schema;

var url = 'mongodb://localhost/mydb';

var db  = mongoose.createConnection(url, function(err, res){
    if(err){
        console.log('Error connected: ' + url + ' - ' + err);
    }else{
        console.log('Success connected: ' + url);
    }
});

// Modelの定義
// var MeetingDataSchema = new mongoose.Schema({
//   'name' : String,
//   'date' : String,
//   'time' : String,
//   'content' : String
// })

var MeetingDataSchema = new mongoose.Schema({
  // 'title' : String,
  // 'start' : String,
  // 'end' : String
  'schedule' : String
})

exports.MeetingData = db.model('MeetingInfomation', MeetingDataSchema);
