const express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const mongoC = require("mongodb").MongoClient;

var url = "mongodb://localhost:27017/medicalInsights";
mongoC.connect(url, function(err, db) {
    if(err) throw err;
router.get("/", function(req, res) {
    db.collection("UserDetails").find({ $and: [{ "user.userName": userName, "user.password": pass }] }).toArray(function(err, rep) {
        if (err) throw err;
        res.send(rep[0].user.appointment);
    
    })

})
});
module.exports = router;