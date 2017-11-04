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
    router.post("/", function (req, res) {

        var text = req.body;

        db.collection("discussionList").update({
            "_id": 1
        }, {
            $push: {
                "discussions": {

                    "userName": text.userName,
                    "email":text.email,
                    "topic": text.post,
                    "discussion": text.detail,
                    "time": dateFormat(new Date()),
                    "replies": []

                }
            }
        }, function (err, rep) {
            if (err) throw err;
            res.send(rep).end();
        })
    });
    router.post("/mail", function(req,res){
        var data = req.body;
       
        var sendMail = {
            from: 'medicalinglobal@gmail.com',
            to: data.to,
            subject : data.sub,
            html:'<p> This is in reply to the discussion posted by you : </p><p><strong><i>'+data.content+'</i><strong></p> <p> from : </p> <p>'+data.from+'</p> <p> -- Sent via Medical Insights </p>'

        }
        transporter.sendMail(sendMail, function (error, info) {
            if(error) {throw error}else{
                res.send("email has been sent successfully");
                res.end();
            }

        })


        
    })
    router.get("/getData", function (req, res) {
        db.collection("discussionList").find().toArray(function (err, rep) {
            if (err) throw err;
            if (rep.length > 0) {
                res.send(rep[0].discussions).end();
            }

        });

    });
    router.post("/getReply", function (req, res) {

        db.collection("discussionList").find().toArray(function (err, rep) {
            if (err) {
                throw err;
            } else {
                db.collection("discussionList").find({
                    $and: [{
                        "_id": 1,
                        "discussions": {
                            $elemMatch: {
                                "userName": req.body.userName,
                                "topic": req.body.topic
                            }
                        }
                    }]
                }).toArray(function (err, reply) {

                    if (err) {
                        throw err;
                    } else {
                        if (reply.length > 0) {
                            var data = reply[0].discussions;
                            data.forEach(function (element) {
                                if (element.userName == req.body.userName && element.topic == req.body.topic) {
                                    res.send(element.replies);

                                }
                            })
                        }
                    }
                })
            }

        })
    })
    router.post("/addReply", function (req, res) {
        var data = req.body;
      

        db.collection("discussionList").findAndModify(

            {
                $and: [{
                    "discussions": {
                        $elemMatch: {
                            "userName": req.body.to,
                            "topic": req.body.topic
                        }
                    }
                }]
            }, [], {
                $addToSet: {
                    "discussions.$.replies": {
                        "reply": data.reply,
                        "from": data.user,
                        "time": dateFormat(new Date()),

                    }

                }
            }, {
                new: true,
                upsert: true,
            },
            function (err, reply) {
                if (err) {
                    throw err;
                } else {
                    db.collection("discussionList").find({
                        $and: [{
                            "_id": 1,
                            "discussions": {
                                $elemMatch: {
                                    "userName": req.body.to,
                                    "topic": req.body.topic
                                }
                            }
                        }]
                    }).toArray(function (err, reply) {

                        if (err) {
                            throw err;
                        } else {
                            if (reply.length > 0) {
                                var data = reply[0].discussions;
                                data.forEach(function (element) {
                                    if (element.userName == req.body.to && element.topic == req.body.topic) {

                                        res.send(element.replies);
                                    }
                                })
                            }
                        }
                    })


                }

            });

    })

    router.post("/messages", function (req, res) {
     
        db.collection("discussionList").find({
            $and: [{
                "_id": 1,
                "discussions": {
                    $elemMatch: {
                        "userName": req.body.user

                    }
                }
            }]
        }).toArray(function (err, reply) {

            if (err) {
                throw err;
            } else {
           
                if (reply.length) {

                    var data = [];
                    var resp = reply[0].discussions;

                    resp.forEach(function (element) {
                        
                        if(element.userName==req.body.user){
                        var obj = {};
                        var replies = [];
                        obj.userName = element.userName;
                        obj.topic = element.topic;
                        obj.discussion = element.discussion;
                        obj.time = element.time;


                        element.replies.forEach(function (ele) {
                            replies.push(ele);

                        })

                        obj.reply = replies;

                        data.push(obj);
                    } 

                    })
                    // console.log(data);
                    res.send(data).end();
                }

            }
        })



    })

    router.post('/delete', function (req, res) {

        db.collection('discussionList')
            .update(

                {
                    "_id": 1
                }, {
                    $pull: {
                        "discussions": {
                            "userName": req.body.user,
                            'topic': req.body.topic,
                            'discussion': req.body.discussion,
                            'time': req.body.time

                        }

                    }
                },

                function (err, reply) {
                    if (err) {
                        throw err;
                    } else {
                                          res.send("success");

                    }
                }
            )

    })

    function getData(name, topic) {
        var data;
        db.collection("discussionList").find({
            $and: [{
                "_id": 1,
                "discussions": {
                    $elemMatch: {
                        "userName": name,
                        "topic": topic
                    }
                }
            }]
        }).toArray(function (err, reply) {

            if (err) {
                throw err;
            } else {
                if (reply.length > 0) {
                    var data = reply[0].discussions;
                    data.forEach(function (element) {
                        if (element.userName == name && element.topic == topic) {

                            data = (element.replies);
                        }
                    })
                }
            }
        })
        return data;
    }


});

module.exports = router;