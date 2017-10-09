'use strict';
var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

const mongoC = require("mongodb").MongoClient;
  
var jwtSecret = "qwerty";
var config = require('../../config/environment');
var reg ="";
var pass ="";


var url = "mongodb://localhost:27017/medicalInsights";
mongoC.connect(url, function(err, db) {
    if(err) throw err;
router.post("/login",authenticate, function(req,res){
    var data = req.body;
   
    db.collection("UserDetails").find({ $and: [{ "user.registrationNumber": req.body.user, "user.password": req.body.pass}] }).toArray(function(err, reply) {
        if (err) {
            throw err;
            res.status(500).end("Error in obtaining information");
        } else {
            console.log(reply);
            if (reply.length == 1) {
                var token = jwt.sign({
                    username: reply[0].user.userName
                }, jwtSecret)
            res.send({
                token : token,
                username: reply[0].user.userName
            })
            }else{
                res.status(401).end("Please enter a valid registration number and password, Login denied");
            }
        }
    })
  
});


function authenticate(req,res,next){
    var data = req.body;
 console.log(data);
    if(!data.user || !data.pass){
        res.status(400).end("must provide valid registration number or password")
    }

    next();
}

});

module.exports = router;