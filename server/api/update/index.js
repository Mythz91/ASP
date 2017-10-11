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
    router.post("/", function(req,res){
    	var data = req.body;
    	console.log("***")
    	console.log(data)
    	db.collection("UserDetails").find({ $and: [{ "user.registrationNumber": req.body.user, "user.password": req.body.pass}] }).toArray(function(err, rep) {

         })
        })
});
module.exports=router;
