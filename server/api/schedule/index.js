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
    function calculateTime(time) {

            switch (time) {
              case "8:00 am":
                return 1;
              case "9:00 am":
                return 2;
              case "10:00 am":
                return 3;
              case "11:00 am":
                return 4;
              case "1:00 pm":
                return 5;
              case "2:00 pm":
                return 6;
              case "3:00 pm":
                return 7;
            }

          }
          function getDateConsize(date, time) {

            var split = date.split("-");
            var year = split[0];
            var month = split[1];
            var dayOne = split[2];
            var day = dayOne.split("T");

            var hour = time.split(":");

            var dateOp = new Date(Date.UTC(year, (month - 1), parseInt(day[0]), getHourTime(hour[0])));

            return dateOp;

          }
          function getHourTime(hour) {
            switch (hour) {
              case "8":
                return 14;
              case "9":
                return 15;
              case "10":
                return 16;
              case "11":
                return 17;
              case "1":
                return 19;
              case "2":
                return 20;
              case "3":
                return 21;
            }
          }
          function getHour(hour) {
            switch (hour) {
              case "14":
                return "8:00 am";
              case "15":
                return "9:00 am";
              case "16":
                return "10:00 am";
              case "17":
                return "11:00 am";
              case "19":
                return "1:00 pm";
              case "20":
                return "2:00 pm";
              case "21":
                return "3:00 pm";
            }
          }
          function obtainHr(date) {

                  var split = date.split("-");
                  var year = split[0];
                  var month = split[1];
                  var dayOne = split[2];
                  var day = dayOne.split("T");
                  var hour = day[1].split(":");

               return hour[0];

                }

    router.post("/editApp", function (req, res) {
      var data = req.body;
      console.log(data)
      console.log("****")
      console.log("data.obj")
      console.log(data.obj);
      console.log("****")
      console.log("data.new")
      console.log(data.new);
      var d = new Date(data.obj.date);
      console.log(d);

console.log(calculateTime(getHour(obtainHr(data.obj.date))))


        db.collection("UserDetails").updateOne({ $and: [{ "user.registrationNumber": data.obj.obj.regNum, "user.userName": data.obj.obj.user }] }, { $pull: { "user.appointment": { "user": data.obj.userName, "date":d, "symptoms": data.obj.symptoms, "age": data.obj.age , "doc":data.obj.doc} } }, function (err, reply) {
            if (err) { throw err } else {

                db.collection("UserDetails").update({ $and: [{ "user.registrationNumber": data.obj.obj.regNum, "user.userName": data.obj.obj.user }] }, { $push: { "user.appointment": { "user": data.new.userName, "date":getDateConsize(data.new.date, data.new.time), "contact": data.obj.obj.contact, "symptoms": data.new.symptoms, "sex": data.new.sex, "age": data.new.age ,"doc":data.new.doc} } }, function (err1, rep) {

                    if (err1) {
                        throw err1;
                    } else {

                        var name = data.new.doc.split(".")[1];
                        db.collection("doctor").updateOne({$and:[{"name":name,"date":dateFormat(new Date(data.obj.date), "mm/dd/yyyy")}]},{$addToSet:{"app":calculateTime(getHour(obtainHr(data.obj.date)))}}, function(er,rep){
                          if(er){
                            throw er;
                          }else{
                            db.collection("doctor").updateOne({$and:[{"name":name,"date":dateFormat(new Date(data.new.date), "mm/dd/yyyy")}]},{$pull:{"app":calculateTime(data.new.time)}}, function(er,rep){
                            }, function(e,r){
                              if(e){
                                throw e;
                              }else{
                                var mail = {
                                  from: 'medicalinglobal@gmail.com',
                                  to: data.obj.obj.email,
                                  subject: 'Medical Insights-Appointment has been Edited ' + data.obj.obj.user,
                                  html: '<h1>Greetings</h1><p>The following appointment is been edited today:</p> <p> The appointment was scheduled for ' + data.obj.userName + ' of age ' + data.obj.age + ' ' + data.obj.sex + ' with symptoms of ' + data.obj.symptoms + ' at ' + dateFormat(new Date(data.obj.date), "ddd mmm dd yyyy HH:MM:ss") + "</p> <h4>Please revert back to us for more information</h4> <p>-Medical Insights</p>"
                              };
                              transporter.sendMail(mail, function (error, info) {
                                  if (error) {throw error;}

                              })

                              }
                            })
                            console.log("here")
                            res.send("success");
                          }
                        })

                      }


                })
            }
        });


        // db.collection("UserDetails").updateOne({ $and: [{ "user.registrationNumber": data.reg, "user.userName": data.regUser }] }, { $pull: { "user.appointment": { "user": data.pastPt, "date": data.pastDate, "symptoms": data.pastSymp, "sex": data.pastSex, "age": data.pastAge } } }, function (err, reply) {
        //     if (err) { throw err } else {

        //         db.collection("UserDetails").update({ $and: [{ "user.registrationNumber": data.reg, "user.userName": data.regUser }] }, { $push: { "user.appointment": { "user": data.pt, "date": data.date, "contact": data.contact, "symptoms": data.symptoms, "sex": data.sex, "age": data.age } } }, function (err1, rep) {

        //             if (err1) {
        //                 throw err1;
        //             } else {
        //                 var mail = {
        //                     from: 'medicalinglobal@gmail.com',
        //                     to: data.email,
        //                     subject: 'Medical Insights-Appointment has been Edited ' + data.regUser,
        //                     html: '<h1>Greetings</h1><p>The following appointment is been edited today:</p> <p> The appointment was scheduled for ' + data.pt + ' of age ' + data.age + ' ' + data.sex + ' with symptoms of ' + data.symptoms + ' at ' + dateFormat(data.date, "ddd mmm dd yyyy HH:MM:ss") + "</p> <h4>Please revert back to us for more information</h4> <p>-Medical Insights</p>"
        //                 };
        //                 transporter.sendMail(mail, function (error, info) {
        //                     if (error) throw error;
        //                     res.send('success')
        //                 })
        //             }
        //         })
        //     }
        // });


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
