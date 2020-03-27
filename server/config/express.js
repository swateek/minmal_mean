/**
 * Express configuration
 */

'use strict';

const express = require('express');
//const favicon = require('serve-favicon');
const morgan = require('morgan');
//const compression = require('compression');
const bodyParser = require('body-parser');
//const methodOverride = require('method-override');
//const cookieParser = require('cookie-parser');
//const errorHandler = require('errorhandler');
const path = require('path');
const passport = require('passport');

module.exports = function(app) {
  //const env = app.get('env');
  const project_root = path.normalize(__dirname + '/../..');

  //app.set('views', config.root + '/server/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  //app.use(compression());
  app.use(bodyParser.json({limit: '50mb'}));

  app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit:500000
  }));
  //app.use(methodOverride());
  //app.use(cookieParser());
  app.use(passport.initialize());
  
  //app.use(favicon(path.join(project_root, 'client', 'favicon.ico')));
  app.use(express.static(path.join(project_root, 'client')));
  app.use('/node_modules/', express.static(path.join(project_root, 'node_modules')));
  app.set('appPath', path.join(project_root, 'client'));
  app.use(morgan('dev'));
};
