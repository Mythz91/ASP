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
  router
    .post("/appointment", function (req, res) {

      var data = req.body;

      var dateConsize = getDateConsize(data.date, data.time);

      db
        .collection("UserDetails")
        .find({
          $and: [
            {
              "user.registrationNumber": data.regNum,
              "user.password": data.password
            }
          ]
        })
        .toArray(function (er, response) {

          if (er) {
            console.log(er);
          } else {
            var diffTime = true;
            var element = response[0].user.appointment
            for (var i = 0; i < element.length; i++) {
              var eleDate = new Date(element[i].date);

              var confDate = new Date(dateConsize);
              if ((Math.round(Math.abs(eleDate.getTime() - confDate.getTime()) / (1000 * 60 * 60 * 24))) == 0) {
                var diff = confDate.getTime() - eleDate.getTime()

                if (diff <= 3600000) {
                  diffTime = false;
                  break;
                }
              }

            }
            if (!diffTime) {
              res.send("failed");
            }
            if (diffTime) {
              db
                .collection("UserDetails")
                .find({
                  $and: [
                    {
                      "user.registrationNumber": data.regNum,
                      "user.password": data.password
                    }
                  ]
                })
                .toArray(function (err, reply) {
                  var date = data.date
                  if (err) {
                    throw err;
                  }
                  if (reply.length) {
                    var email = reply[0].user.email;
                    console.log(email);
                    if (reply.length == 1) {

                      db
                        .collection("UserDetails")
                        .update({
                          "user.registrationNumber": data.regNum
                        }, {
                          $push: {
                            "user.appointment": {
                              "user": data.userName,
                              "age": data.age,
                              "sex": data.sex,
                              "contact": data.contact,
                              "date": dateConsize,
                              "symptoms": data.symptoms,
                              "doc": data.doc
                            }
                          }
                        }, function (err, rep) {
                          if (err)
                            throw err;

                          var time = calculateTime(data.time);
                          var doc = data
                            .doc
                            .split(".");

                          var presDate = dateFormat(data.date, "mm/dd/yyyy")
                          console.log(doc, time, presDate)
                            db
                              .collection("doctor")
                              .update({
                                $and: [
                                  {
                                    "name": doc[1]
                                  }, {
                                    "date": presDate
                                  }
                                ]
                              }, {
                                $pull: {
                                  "app": time
                                }
                              },
                            function (err, rep) {
                              if (err){
                                throw err;}
                             else{
                              var sendEMail = {
                                from: 'medicalinglobal@gmail.com',
                                to: email,
                                subject: 'Medical Insights-Appointment Confirmation',
                                html: '<h2>Appointment Confirmation --- Medical Insights</h2><p>The following appointme' +
                                    'nt has been confirmed :</p> <table><tr><th>Name : </th><td>' + data.userName + '</td></tr><tr><th>Age : </th><td>' + data.age + '</td></tr><tr><th>Sex : </th><td>' + data.sex + '</td></tr><tr><th>Date: </th><td>' + presDate+ '</td></tr><tr><th>with doc: </th><td>'+doc+'</td></tr><tr><th>Symptoms: </th><td>' + data.symptoms + '</td></tr><tr><th>Phone: </th><td>' + data.contact + '</td></tr></table>'

                              };
                              transporter.sendMail(sendEMail, function (error, info) {
                                if (error) {
                                  throw err;
                                } else {
                                  res.send("appointment confirmed")
                                }

                              })
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

      var dateOp = new Date(Date.UTC(year, (month - 1), day[0], getHourTime(hour[0])));

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
  });

  module.exports = router;
