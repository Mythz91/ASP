const express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const mongoC = require("mongodb").MongoClient;
const mailer = require("nodemailer");
var config = require('../../config/environment');
const dateFormat = require("dateformat");
var url = "mongodb://localhost:27017/medicalInsights";
mongoC.connect(url, function (err, db) {
    if (err) throw err;
    router.post("/", function (req, res) {
        console.log(req.body);
        var text = req.body;

        db.collection("discussionList").update({
            "_id": 1
        }, {
            $push: {
                "discussions": {

                    "userName": text.userName,
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
    router.get("/getData", function (req, res) {
        db.collection("discussionList").find().toArray(function (err, rep) {
            if (err) throw err;
            if (rep.length > 0) {
                res.send(rep[0].discussions).end();
            }

        });

    });
    router.post("/getReply", function (req, res) {
        console.log(req.body);
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
        console.log(req.body);

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
                        replies: []
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
                           
                           data=(element.replies);
                        }
                    })
                }
            }
        })
        return data;
    }
    router.post("/messages",function(req,res){
        var data = req.body;
       
    })

});

module.exports = router;