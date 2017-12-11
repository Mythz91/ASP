/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
var jwtSecret = require('./api/login').jwtSecret;

var config = require('./config/environment');

module.exports = function (app) {
  app.use(expressJwt({
    secret : jwtSecret
  }).unless({
    path :['/api/v1/login','/api/v1/register','/welcome']
  }));


  app.use('/api/v1/login', require('./api/login').router);
  app.use('/api/v1/register', require('./api/register'));
  app.use('/api/v1/getAppointments', require('./api/previous'))
  app.use('/api/v1/appointment', require('./api/appointment'));
  app.use('/api/v1/update', require('./api/update'));
  app.use('/api/v1/discussion', require('./api/discussion'));
  app.use('/api/v1/schedule', require('./api/schedule'));
  app.use('/api/v1/review',require('./api/review'));
  app.use('/api/v1/docs',require('./api/doctors'));
app.use('/api/v1/doctors', require('./api/doc'))


};
