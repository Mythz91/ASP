const express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const mongoC = require("mongodb").MongoClient;
const mailer = require("nodemailer");
var config = require('../../config/environment');
const dateFormat = require("dateformat");
var url = "mongodb://localhost:27017/medicalInsights";

var transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'medicalinglobal@gmail.com',
        pass: 'medGlo.123'
    }
});

mongoC.connect(url, function (err, db) {
  if (err) throw err;
  router.post("/getData", function (req, res) {
    var data = req.body;
    console.log(data);
    var arr=[];
   db.collection("UserDetails").find().toArray(function(err, response){
    for(var i=1; i<response.length;i++){
      var a = response[i].user.appointment;

     for(var j=0;j<a.length;j++){

       var doc="Dr."+data.user;

       if(a[j].doc==doc){
         console.log(response[i].user.registrationNumber)
         console.log(a[j])
         arr.push(response[i].user.registrationNumber);
       }
     }
    }
    var unique = arr.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
  })
 res.send(unique);
   })
  })
  router.post("/getNames", function (req, res) {
    var data = req.body;
    console.log(data);
    var arr=[];
   db.collection("UserDetails").find().toArray(function(err, response){
    for(var i=1; i<response.length;i++){
      var a = response[i].user.appointment;

     for(var j=0;j<a.length;j++){

       var doc="Dr."+data.user;

       if(a[j].doc==doc && response[i].user.registrationNumber==data.reg){

         arr.push(a[j].user);
       }
     }
    }
    var unique = arr.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
  })
 res.send(unique);
   })
  })
router.post("/getDetails",function(req,res){
  var obj={
    future:[],
    present:[],
    past:[]
  };
  var data = req.body;
  var now = new Date();
  var presentDate = dateFormat(now, "mm/dd/yyyy").toString();

  db.collection("summary").find({$and:[{"name":data.name,"reg":data.reg}]}).toArray(function(err, reply){
    for(var i=0;i<reply.length;i++){

      var dateOb = dateFormat(reply[i].date,"mm/dd/yyyy").toString();
      if(dateOb == presentDate){
  if(reply[i].summary.length==0){
    obj.present.push(reply[i])
  }else{
    obj.past.push(reply[i])
  }
}
if(now.getTime() <reply[i].date.getTime()){
  console.log("in future")
  obj.future.push(reply[i])
}
if(now.getTime() >reply[i].date.getTime() && !(dateOb == presentDate)){
  console.log("in past")
  obj.past.push(reply[i])
}
    }
res.send(obj);
  })

})

})
module.exports = router;
