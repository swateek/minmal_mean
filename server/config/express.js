'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');

module.exports = function(app) {
  const project_root = path.normalize(__dirname + '/../..');

  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(bodyParser.json({limit: '50mb'}));

  app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit:500000
  }));
  app.use(passport.initialize());
  
  app.use(express.static(path.join(project_root, 'client')));
  app.use('/node_modules/', express.static(path.join(project_root, 'node_modules')));
  app.set('appPath', path.join(project_root, 'client'));
  app.use(morgan('dev'));
};
