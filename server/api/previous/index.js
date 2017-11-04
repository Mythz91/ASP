const express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const mongoC = require("mongodb").MongoClient;

var url = "mongodb://localhost:27017/medicalInsights";
mongoC.connect(url, function(err, db) {
    if(err) throw err;
    var data ;
router.post("/", function(req, res) {
    db.collection("UserDetails").find({ $and: [{ "user.registrationNumber": req.body.regNum, "user.password": req.body.password}] }).toArray(function(err, rep) {
        if (err) {
            throw err;
        }if(rep.length){
          
            res.send(rep[0].user.appointment);
            res.end();
        
        }
 
    })

})
});
module.exports = router;