'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mailer = require("nodemailer");

var config = require('./config/environment');

var app = express();
var server = require('http').createServer(app);

require('./config/express')(app);
require('./routes')(app);


// connecttoDB (function() {
  // routes
  //api
  // components
  //views
//})
// Start server
server.listen(config.port, config.ip, function () {

console.log(config.port)
  if (config.env === 'development') {
    require('ripe').ready();
  }

});

// Expose app
exports = module.exports = server;
