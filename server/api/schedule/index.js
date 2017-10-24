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
    router.get("/", function (req, res) {
        db.collection("UserDetails").find().toArray(function (err, reply) {
            if (err) {
                throw err;
                res.status(500).end("Error in obtaining information");
            } else {

                var app = [];
                
                for (var i = 1; i < reply.length; i++) {
                    
                    if (reply[i].user != undefined && reply[i].user.userName != 'admin') {
                        
                        var userData ={};
                        appoint = reply[i].user.appointment;
                       for (var j =0;j<appoint.length;j++){
                        var data = {};
                          data.appoint= appoint[j];
                          console.log(appoint[j]);
                       
                           userData.userName = (reply[i].user.userName);
                           userData.reg = (reply[i].user.registrationNumber);
                           userData.email = (reply[i].user.email);
                           userData.addr = (reply[i].user.address);
                           data.user=userData;
                           app.push(data);
                       }
                        
                    
                    }
                }

                res.send(app);
                res.end();
            }

        })
    })
});
module.exports = router;