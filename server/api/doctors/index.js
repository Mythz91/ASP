const express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const mongoC = require("mongodb").MongoClient;
const dateFormat = require("dateformat");

var url = "mongodb://localhost:27017/medicalInsights";
mongoC.connect(url, function (err, db) {
    if (err)
        throw err;
    router
        .get("/getList", function (req, res) {

            var data = [];
            db
                .collection("doctor")
                .find()
                .toArray(function (err, reply) {
                    if (err)
                        throw err;

                    for (var i = 0; i < reply.length; i++) {
                        if (reply[i].department) {
                            data.push({dept: reply[i].department, docs: reply[i].doctors});
                        }

                    }

                    res
                        .send(data);
                })

        })
    router.post("/getTime", function (req, res) {
        var data = req.body;

        var name = data
            .doc
            .split(".");
        var doc = name[1];
        var date = dateFormat(data.date, "mm/dd/yyyy")
        db
            .collection("doctor")
            .find(
              {
                "name":doc,
                "date":date
              }
            )
            .toArray(function (err, reply) {
                if (err)
                    throw err;
                var found = false;


                var con;


                if(reply.length){

                  if(reply[0].name ==doc && reply[0].date==date){
                    found==true;


                    res.send(reply[0].app).end();
                    return;

                  }
                }


                if (found == false) {

                    db
                        .collection("doctor")
                        .insertOne({
                            "name": doc,
                            "date": date,
                            "app": [
                                date,
                                1,
                                2,
                                3,
                                4,
                                5,
                                6,
                                7
                            ]
                        }, function (err, rep) {
                            if (err)
                                throw err;
                            if (rep) {

                                res.send([
                                    1,
                                    2,
                                    3,
                                    4,
                                    5,
                                    6,
                                    7
                                ]);
                            }

                        })
                }
            })
    });

});
module.exports = router;
