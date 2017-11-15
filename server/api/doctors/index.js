const express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const mongoC = require("mongodb").MongoClient;

var url = "mongodb://localhost:27017/medicalInsights";
mongoC.connect(url, function(err, db) {
    if(err) throw err;
    router.get("/getList",function(req,res){
    
        var data = [];
        db.collection("doctor").find().toArray(function(err,reply){
            if(err) throw err;
         
            for(var i=0;i<reply.length;i++){
                if(reply[i].department){
                    data.push( {
                        dept:reply[i].department,
                        docs:reply[i].doctors
                    });
                }
             
            }
  
            res.send(data).end();
        })
       
    })
    router.post("/getTime",function(req,res){
var data = req.body;
var name = data.doc.split(".");
var doc = name[1];
db.collection("doctor").find().toArray(function(err,reply){
    if(err) throw err;
 for(var i=2; i<reply.length;i++){

    if(reply[i].name==doc){
        console.log(reply[i]);
        if(!reply[i].appointments.date){
          //  db.collection("doctor").update({"name":doc},{$push:{"date":}})
        }
    }
    
 }
})
    });
    
});
module.exports = router;