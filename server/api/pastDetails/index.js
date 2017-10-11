const express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const mongoC = require("mongodb").MongoClient;
var config = require('../../config/environment');
var url = "mongodb://localhost:27017/medicalInsights";
