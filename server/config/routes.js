/**
* Main application routes
*/

'use strict';

var errors = require('./errors');
var path = require('path');
var bodyParser = require('body-parser');


module.exports = function(app) {

  app.use( bodyParser.json({limit: '50mb'}) );

  app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit:500000
  }));

  // Insert rdfdoutes below
  app.use('/api', require('../api'));
  app.use('/auth', require('../auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|assets|app)/*').get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
  .get(function(req, res) {
    res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
  });
};
