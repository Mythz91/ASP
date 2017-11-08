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
    router.post("/appointment", function (req, res) {
        console.log("here1")
        var data = req.body;
        db.collection("UserDetails").find({
            $and: [{
                "user.registrationNumber": req.body.regNum,
                "user.password": req.body.password
            }]
        }).toArray(function (er, response) {
            console.log("here2")
            if (er) {
                console.log(er);
            } else {
                var diffTime=true;
                    var element = response[0].user.appointment
                    for(var i=0; i<element.length;i++){
                    var eleDate = new Date(element[i].date);

                    var confDate = new Date(req.body.date);
                    if ((Math.round(Math.abs(eleDate.getTime() - confDate.getTime()) / (1000 * 60 * 60 * 24))) == 0) {
                        var diff =  confDate.getTime()-eleDate.getTime()

                        console.log(diff)
                        if (diff <= 3600000) {
                            diffTime=false;
                          break;
                        }
                    }

                }
                if(!diffTime){
                    res.send("failed");
                }
                if(diffTime){
                    db.collection("UserDetails").find({
                                $and: [{
                                    "user.registrationNumber": req.body.regNum,
                                    "user.password": req.body.password
                                }]
                            }).toArray(function (err, reply) {
                                var date = req.body.date
                                if (err) {
                                    throw err;
                                }
                                if (reply.length) {
                                    var email = reply[0].user.email;
                        
                                    if (reply.length == 1) {
                        
                                        db.collection("UserDetails").update({
                                            "user.registrationNumber": data.regNum
                                        }, {
                                            $push: {
                                                "user.appointment": {
                                                    "user": req.body.userName,
                                                    "age": req.body.age,
                                                    "sex": req.body.sex,
                                                    "contact": req.body.contact,
                                                    "date": req.body.date,
                                                    "symptoms": req.body.symptoms
                        
                                                }
                                            }
                                        }, function (err, rep) {
                                            if (err) throw err;
                                            var sendMail = {
                                                from: 'medicalinglobal@gmail.com',
                                                to: email,
                                                subject: 'Medical Insights-Appointment Confirmation',
                                                html: '<h2>Appointment Confirmation --- Medical Insights</h2><p>The following appointment has been confirmed :</p> <table><tr><th>Name : </th><td>' + req.body.userName + '</td></tr><tr><th>Age : </th><td>' + req.body.age + '</td></tr><tr><th>Sex : </th><td>' + req.body.sex + '</td></tr><tr><th>Date: </th><td>' + dateFormat(req.body.date, "ddd mmm dd yyyy HH:MM:ss") + '</td></tr><tr><th>Symptoms: </th><td>' + req.body.symptoms + '</td></tr><tr><th>Phone: </th><td>' + req.body.contact + '</td></tr></table>'
                        
                                            };
                        
                        
                                            transporter.sendMail(sendMail, function (error, info) {
                                                if (error) {
                                                    throw err;
                                                } else {
                                                    res.send("appointment confirmed")
                                                }
                        
                                            })
                                        })
                        
                                    }
                                }
                            })
                }

            }

        })

    })
});

module.exports = router;
