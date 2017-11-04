var express = require('express');
var router = express.Router();
const mongoC = require("mongodb").MongoClient;
const mailer = require("nodemailer");
const dateFormat = require("dateformat");

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

                        var userData = {};
                        appoint = reply[i].user.appointment;
                        for (var j = 0; j < appoint.length; j++) {
                            var data = {};
                            data.appoint = appoint[j];
                          

                            userData.userName = (reply[i].user.userName);
                            userData.reg = (reply[i].user.registrationNumber);
                            userData.email = (reply[i].user.email);
                            userData.addr = (reply[i].user.address);
                            data.user = userData;
                            app.push(data);
                        }


                    }
                }

                res.send(app);
                res.end();
            }

        })
    })
    router.post("/delete", function (req, res) {
        var data = req.body;
        db.collection("UserDetails").updateOne({ $and: [{ "user.registrationNumber": data.regNum, "user.userName": data.regUser }] }, { $pull: { "user.appointment": { "user": data.pt, "date": data.date, "symptoms": data.sym, "sex": data.sex, "age": data.age } } }, function (err, reply) {
            if (err) { throw err; } else {
              
                var sendMail = {
                    from: 'medicalinglobal@gmail.com',
                    to: data.mail,
                    subject: 'Medical Insights-Appointment Cancelled ' + data.regUser,
                    html: '<h1>Greetings</h1><p>The following appointment is been cancelled today:</p> <p> The appointment was scheduled for ' + data.pt + ' of age ' + data.age + ' ' + data.sex + ' with symptoms of ' + data.sym + ' at ' + dateFormat(data.date, "ddd mmm dd yyyy HH:MM:ss") + "</p> <h4>Please revert back to us as soon as possible for further information</h4> <p>-Medical Insights</p>"
                };
                transporter.sendMail(sendMail, function (error, info) {
                    if (error) throw error;
                    res.send(200).end("deleted");
                })

            }
        });

    })
    router.post("/editApp", function (req, res) {
      var data = req.body;
        db.collection("UserDetails").updateOne({ $and: [{ "user.registrationNumber": data.reg, "user.userName": data.regUser }] }, { $pull: { "user.appointment": { "user": data.pastPt, "date": data.pastDate, "symptoms": data.pastSymp, "sex": data.pastSex, "age": data.pastAge } } }, function (err, reply) {
            if (err) { throw err } else {
            
                db.collection("UserDetails").update({ $and: [{ "user.registrationNumber": data.reg, "user.userName": data.regUser }] }, { $push: { "user.appointment": { "user": data.pt, "date": data.date, "contact": data.contact, "symptoms": data.symptoms, "sex": data.sex, "age": data.age } } }, function (err1, rep) {
                 
                    if (err1) {
                        throw err1;
                    } else {
                        var mail = {
                            from: 'medicalinglobal@gmail.com',
                            to: data.email,
                            subject: 'Medical Insights-Appointment has been re-scheduled ' + data.regUser,
                            html: '<h1>Greetings</h1><p>The following appointment is been re-scheduled for today:</p> <p> The appointment was scheduled for ' + data.pt + ' of age ' + data.age + ' ' + data.sex + ' with symptoms of ' + data.symptoms + ' at ' + dateFormat(data.date, "ddd mmm dd yyyy HH:MM:ss") + "</p> <h4>Please revert back to us for more information</h4> <p>-Medical Insights</p>"
                        };
                        transporter.sendMail(mail, function (error, info) {
                            if (error) throw error;
                            res.send('success')
                        })
                    }
                })
            }
        });


    })
    router.post('/remind', function (req, res) {
        var data = req.body;
        var sendMail = {
            from: 'medicalinglobal@gmail.com',
            to: data.mail,
            subject: 'Medical Insights-Appointment Reminder ' + data.regUser,
            html: '<h1>Greetings</h1><p>The following appointment is been scheduled for today:</p> <p> The appointment was scheduled for ' + data.pt + ' of age ' + data.age + ' ' + data.sex + ' with symptoms of ' + data.sym + ' at ' + dateFormat(data.date, "ddd mmm dd yyyy HH:MM:ss") + "</p> <h4>Please revert back to us as soon as possible</h4> <p>-Medical Insights</p>"
        };


        transporter.sendMail(sendMail, function (error, info) {
            if (error) throw error;
            res.send('mail sent')
        })


    })
});
module.exports = router;