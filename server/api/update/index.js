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
    router.post("/", function (req, res) {
        var data = req.body;
 
     db.collection("UserDetails").updateOne({ "user.registrationNumber": data.registration }, {
            $set: {
                "user.userName": data.userName,
                "user.registrationNumber": data.registration,
                "user.email": data.email,
                "user.address": data.address,
                "user.password": data.password
            }
        }, function (err, reply) {
            if (err) {throw err;}
            else {
                var sendMail = {
                    from: 'medicalinglobal@gmail.com',
                    to: data.email,
                    subject: 'Medical Insights-Update Information',
                    html: '<h2>Update of Information --- Medical Insights</h2><p>The user details have been updated</p>'

                };
                transporter.sendMail(sendMail, function(error, info) {
                    if (error) {

                        res.send('updated but mail sending failed');
                    } else {
                     
                        res.end("Update of information is successful");
                    }

                
            })
        }
        
        })


    });
    router.post("/getUserData", function (req, res) {
        var data = req.body;

        db.collection("UserDetails").find({ $and: [{ "user.registrationNumber": req.body.regNum, "user.password": req.body.password }] }).toArray(function (err, rep) {
            if (err) throw err;
            if (rep.length) {
                var data = {
                    user: rep[0].user.userName,
                    registration: rep[0].user.registrationNumber,
                    street: rep[0].user.address.street,
                    city: rep[0].user.address.city,
                    state: rep[0].user.address.state,
                    zip: rep[0].user.address.zip,
                    email: rep[0].user.email

                }
                res.send(data).end();
            }
        })
    })
});
module.exports = router;
