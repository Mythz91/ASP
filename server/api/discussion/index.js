const express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const mongoC = require("mongodb").MongoClient;
const mailer = require("nodemailer");
var config = require('../../config/environment');
const dateFormat = require("dateformat");
var url = "mongodb://localhost:27017/medicalInsights";
mongoC.connect(url, function (err, db) {
    if (err) throw err;
    router.post("/", function (req, res) {
        console.log(req.body);
        var text = req.body;
        
        db.collection("discussionList").update({"_id":1}, {
            $push: {
            "discussions": {
                
                    "userName": text.userName,
                    "topic": text.post,
                    "discussion": text.detail,
                    "time": dateFormat(new Date()),
                    "replies":[]
                
                }
            }
        }, function (err, rep) {
            if (err) throw err;
            res.send(rep).end();
        })
    });
    router.get("/getData", function (req, res) {
        db.collection("discussionList").find().toArray(function(err,rep){
            if(err) throw err;
            if(rep.length>0){
                res.send(rep[0].discussions).end();
            }
            
        });

    });
    router.post("/getReply", function(req,res){
        console.log(req.body);
        db.collection("discussionList").find().toArray(function(err,rep){
            if(err) throw err;

        })
    })
    router.post("/addReply", function(req,res){
        var data = req.body;
        console.log(req.body);
        //{ field1: { $elemMatch: { one: 1 } } }
        db.collection("discussionList").find({"_id":1},{"discussions":{ $elemMatch: { "userName": req.body.to, "topic": req.body.topic}}}).toArray(function(err,rep){
            if(err) throw err;
            console.log(rep[0]);
            if(rep.length){
               db.collection("discussionList").update({"_id":1},{"discussions":{
                $push: {
                    "replies":{
                        "reply" : data.reply,
                        "from" : data.user,
                        "time":dateFormat(new Date()),
                        replies:[]
                    }
                }
               }})
            }

        }, function (err, rep) {
            if (err) throw err;
            res.send(rep).end();
        })
    })
});
module.exports = router;