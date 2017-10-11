/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

var config = require('./config/environment');

module.exports = function (app) {

  // Insert routes below
  app.use('/api/v1/home', require('./api/home'));

  app.use('/api/v1/login', require('./api/login'));
  app.use('/api/v1/register', require('./api/register'));
  app.use('/api/v1/getAppointments', require('./api/previous'))
  app.use('/api/v1/appointment', require('./api/appointment'));
  app.use('/api/v1/update', require('./api/update'));
  // app.use('api/v1/register',require('./api/register'));
  // Return API Version
  app.route('/api').get(function (req, res) {
    res.json({ "name": pkg.name, "version": "v1", "rev": pkg.version });
  });

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function (req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });

};
