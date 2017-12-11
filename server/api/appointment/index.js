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
            var diffTime = 1;
            var element = response[0].user.appointment
            for (var i = 0; i < element.length; i++) {
              var eleDate = new Date(element[i].date);

              var confDate = new Date(dateConsize);
              if ((Math.round(Math.abs(eleDate.getTime() - confDate.getTime()) / (1000 * 60 * 60 * 24))) == 0) {
               diffTime=diffTime+1;
              }
            }
            if (diffTime >5) {
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
                               db.collection("summary").insertOne({
                                 "name":data.userName,
                                 "reg": data.regNum,
                                 "doc":data.doc,
                                 "date":dateConsize,
                                 "prob": data.symptoms,
                                 "age":data.age,
                                 "summary":[]

                               }, function(err,response){
                                if(err) throw err;
                                var sendEMail = {
                                  from: 'medicalinglobal@gmail.com',
                                  to: email,
                                  subject: 'Medical Insights-Appointment Confirmation',
                                  html: '<h2>Appointment Confirmation --- Medical Insights</h2><p>The following appointme' +
                                      'nt has been confirmed :</p> <table><tr><th>Name : </th><td>' + data.userName + '</td></tr><tr><th>Age : </th><td>' + data.age + '</td></tr><tr><th>Sex : </th><td>' + data.sex + '</td></tr><tr><th>Date: </th><td>' + presDate+ '</td></tr><tr><th>with doc: </th><td>'+doc+'</td></tr><tr><th>Symptoms: </th><td>' + data.symptoms + '</td></tr><tr><th>Phone: </th><td>' + data.contact + '</td></tr></table>'

                                };
                                transporter.sendMail(sendEMail, function (error, info) {
                                  if (error) {
                                    console.log(err)
                                  }
                                    res.send("appointment confirmed")


                                })
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

    router.post("/changeAppointmentDate", function(req,res){
      var data = req.body;

           var d = new Date(data.obj.date);

           console.log(getDateConsize(data.date, data.time));
        db.collection("UserDetails").updateOne({ $and: [{ "user.registrationNumber": data.regNum, "user.userName": data.user }] }, { $pull: { "user.appointment": { "user": data.obj.userName, "date":d, "symptoms": data.obj.symptoms, "age": data.obj.age , "doc":data.obj.selectDoc} } }, function (err, reply) {
            if (err) { throw err } else {

                db.collection("UserDetails").update({ $and: [{ "user.registrationNumber": data.regNum, "user.userName": data.user }] }, { $push: { "user.appointment": { "user": data.userName, "date":getDateConsize(data.date, data.time), "contact": data.obj.contact, "symptoms": data.symptoms, "sex": data.sex, "age": data.age ,"doc":data.doc} } }, function (err1, rep) {

                    if (err1) {
                        throw err1;
                    } else {
                      console.log("here1")
                          var name = data.doc.split(".")[1];

                          db.collection("doctor").updateOne({$and:[{"name":name,"date":dateFormat(d, "mm/dd/yyyy")}]},{$pull:{"app":calculateTime(data.time)}}, function(er,rep){
                            if(er){
                              throw er;
                            }else{

                              db.collection("doctor").updateOne({$and:[{"name":name,"date":dateFormat(d, "mm/dd/yyyy")}]},{$addToSet:{"app":calculateTime(data.obj.time)}}, function(er,rep){

                                if(er){
                                  throw e;
                                }

                                 db.collection("summary").remove({
                                  "name":data.obj.userName,
                                  "reg": data.regNum,
                                  "doc":data.doc,
                                  "date":d,
                                  "prob": data.obj.symptoms,
                                  "age":data.obj.age


                                 },function(err,resp){
                                   if(err) throw err;
                                   db.collection("summary").insert({
                                    "name":data.userName,
                                    "reg": data.regNum,
                                    "doc":data.doc,
                                    "prob":data.symptoms,
                                    "date":getDateConsize(data.date, data.time),
                                    "age": data.age,
                                    "summary":[]

                                   }, function(err,resp){
                                     if(err) throw err;
                                     var mail = {
                                      from: 'medicalinglobal@gmail.com',
                                      to: data.email,
                                      subject: 'Medical Insights-Appointment has been Edited ' + data.user,
                                      html: '<h1>Greetings</h1><p>The following appointment is been edited today:</p> <p> The appointment was scheduled for ' + data.userName + ' of age ' + data.age + ' ' + data.sex + ' with symptoms of ' + data.symptoms + ' at ' + dateFormat(new Date(data.date), "ddd mmm dd yyyy HH:MM:ss") + "</p> <h4>Please revert back to us for more information</h4> <p>-Medical Insights</p>"
                                  };
                                  transporter.sendMail(mail, function (error, info) {
                                      if (error) throw error;})
                                   })
                                 })
                                  res.send("success");

                              })
                            }
                          })





                    }
                })
            }
        });

    })

    router.post("/dropAppointment", function(req,res){
      var data = req.body;
 var d = new Date(data.date);
      db.collection("UserDetails").update({$and: [{"user.registrationNumber":data.regNum,"user.userName":data.user}]},{$pull:{"user.appointment":{"user":data.userName, "age":data.age, "doc": data.doc, "date":d, "sex":data.gen}}},function(err,reply) {
        if(err){
          throw err;
        }else{
          db.collection("doctor").updateOne({$and:[{"name":data.doc.split(".")[1],"date":dateFormat(d, "mm/dd/yyyy")}]},{$push:{"app":calculateTime(getHour(obtainHr(data.date)))}}, function(er,rep){
            if(er){
              throw er;
            }else{
              db.collection("summary").remove({
                "name":data.userName,
                "reg": data.regNum,
                "doc":data.doc,
                "date":d,

               },function(err,resp){
                 if(err) throw err;
                res.send("success");
            }
          )
        }

        })
      }
      })
    })
  });

  module.exports = router;
