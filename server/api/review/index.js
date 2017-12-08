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
    router.get("/", function (req, res) {

        db.collection("UserDetails").find().toArray(function (err, reply) {
            if (err) throw err;
            if (reply.length) {
                var arr = [];
                reply[0].registrationList.forEach(function (element) {

                    if (element.length == 7 && element !== '9999999') {
                        arr.push(element);
                    }
                })
                res.send(arr);
            }
        })
    })
    router.post("/getReview", function (req, res) {
        var data = req.body;

       db.collection("review").find().toArray(function (err, reply) {
            if (err) {
                throw err;
            } else {
                if(reply.length){
                   var rev = {
                       review : ""
                   };
                reply[0].reviews.forEach(function(element){
                    if(element.userName == data.user && element.regNum == data.regNum && element.date == data.date){
                        rev.review = element.review;


                    }
                })
               res.send(rev);
            }
            }
        });
    })
    router.post("/checkReview",function(req,res){
        var data = req.body;

        db.collection("review").find().toArray(function(err,reply){

            if(err){
                throw err
            }
            if(reply.length){
                var rep =0;
                reply[0].reviews.forEach(function (element) {
              if(element.regNum == data.reg && element.date==data.date && element.symptoms==data.symp){
                  rep=1;

             }
            })
            if(rep==0){
                res.send("empty");
            }else{
                res.send("found")
            }
        }

    })
})
    router.post("/getReviews", function (req, res) {

        var data = req.body.reg;
        db.collection("review").find().toArray(function (err, reply) {
            if (err) {
                throw err;
            }
            if (reply.length) {
                var arr = [];
                reply[0].reviews.forEach(function (element) {
                    if (element.regNum == data) {
                        arr.push(element);

                    }
                })
                res.send(arr);
            }

        })
    })

    router.post("/review", function (req, res) {

        db.collection("review").update({
            "_id": 1
        }, {
            $push: {
                "reviews": req.body
            }
        }, function (err, result) {
            if (err) {
                throw err;
            } else {
                res.send("success");
            }
        })

    })


});

module.exports = router;
