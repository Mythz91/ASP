'use strict';

var express = require('express');
var compression = require('compression');
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var config = require('./environment');
var multer = require("multer");
var upload = multer();
var mongoC = require("mongodb").MongoClient;
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");


module.exports = function (app) {

  var env = config.env;
  

  app.set('view engine', 'html');
  
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(compression());
  app.use(morgan('dev'));
  app.use(express.static(path.join(config.root, 'client')));
  app.set('appPath', 'client');
  app.use(cors());
 
  // app.use(expressJwt({
  //   secret : jwtSecret
  // }).unless({
  //   path :['/login']
  // }));
  if (env === 'development' || env === 'test') {
    app.use(require('errorhandler')());
  }

};
