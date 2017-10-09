'use strict';
var express = require('express');
var router = express.Router();
const mongoC = require("mongodb").MongoClient;
const mailer = require("nodemailer");

var config = require('../../config/environment');
var transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'medicalinglobal@gmail.com',
        pass: 'medGlo.123'
    }
});

var url = "mongodb://localhost:27017/medicalInsights";
mongoC.connect(url, function (err, db) {
    if (err) throw err;
    router.post("/register", function (req, res) {
        var data = req.body;
        console.log(data);
       
        db.collection("UserDetails"). find({"reg":"userReg"},{"registrationList":data.registration}).toArray(function(err, reply) {
            var count =1;
            if(err) throw err;
            
            else{
                var arr = reply[0].registrationList;
               arr.forEach(function(element){
                   if(data.registration ==element){
                       count=0;
                       res.send("the registration number is already in use");
                       res.end();
                    
                   }else{
                       count=1;
                       
                   }
               })
            
                if(count==1){
                      db.collection("UserDetails").update({"reg":"userReg"},{$push:{ "registrationList": data.registration }}, function (err, result) {
                    if (err) throw err;
                    if (res) {
                        db.collection("UserDetails").insertOne({
                            "user": {
                                "userName": data.userName,
                                "registrationNumber": data.registration,
                                "password": data.password,
                                "address": data.address,
                                "email": data.email,
                                "appointment": []
                            }
                        }, function (err, result) {
                            if (err) throw err;
                            if (result) {
                                console.log(result);
                                var sendMail = {
                                    from: 'medicalinglobal@gmail.com',
                                    to: data.email,
                                    subject: 'Medical Insights-Registration',
                                    html: '<h1>Welcome to Medical Insights</h1><p>Please login to continue your access to the website</p><p>Thanks <br/> -Medical Insights</p>'
                                };
        
        
                                transporter.sendMail(sendMail, function (error, info) {
                                    if (error) {
        
        
                                        db.collection("UserDetails").deleteOne({
                                            "user": {
                                                "userName": data.userName,
                                                "registrationNumber": data.registration,
                                                "password": data.password,
                                                "address": data.address,
                                                "email": data.email,
                                                "appointment": []
                                            }
                                        }, function (err, resp) {
                                            if (err) throw err;
                                            if (resp) {
                                                db.collection("UserDetails").update({"reg":"userReg"},{$pull:{"registrationList":data.registration}}), function (err, results) {
                                                    if (err) throw err;
                                                }
                                             
                                            }
                                        })
                                        res.send("please provide valid email address");
                                        res.end();
        
                                    } else {
                                        console.log('Email sent');
                                        res.send("you have got successfully registered a email is sent for your reference");
                                        res.end();
                                    }
                                });
        
                            }
        
                        })
                    }
        
                })
            }
            }
        })
      
    })
   
})
module.exports = router; 