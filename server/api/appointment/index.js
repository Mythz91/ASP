const express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const mongoC = require("mongodb").MongoClient;

var url = "mongodb://localhost:27017/medicalInsights";
mongoC.connect(url, function(err, db) {
    router.post("/appointment", function(req, res) {
        console.log(req.body.date);
        console.log(userName)

        db.collection("UserDetails").find({ $and: [{ "user.userName": userName, "user.password": pass }] }).toArray(function(err, reply) {
            var date = req.body.date
            if (err) {
                throw err;
            } else {
                let email = reply[0].user.email;


                if (reply.length == 1) {

                    db.collection("UserDetails").update({ "user.userName": userName }, {
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
                    }, function(err, rep) {
                        if (err) throw err;

                        console.log("1 document updated");

                        var sendMail = {
                            from: 'medicalinglobal@gmail.com',
                            to: email,
                            subject: 'Medical Insights-Appointment Confirmation',
                            html: '<h2>Appointment Confirmation --- Medical Insights</h2><p>The following appointment has been confirmed :</p> <table><tr><th>Name : </th><td>' + req.body.userName + '</td></tr><tr><th>Age : </th><td>' + req.body.age + '</td></tr><tr><th>Sex : </th><td>' + req.body.sex + '</td></tr><tr><th>Date: </th><td>' + req.body.date + '</td></tr><tr><th>Symptoms: </th><td>' + req.body.symptoms + '</td></tr><tr><th>Phone: </th><td>' + req.body.contact + '</td></tr></table>'

                        };


                        transporter.sendMail(sendMail, function(error, info) {
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

    })
});

module.exports=router;
