'use strict';

var express = require('express');
var router = express.Router({mergeParams: true});

router.use('/users', nocache, require('./user/'));

function nocache(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}

module.exports = router;
