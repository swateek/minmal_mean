'use strict';

const express = require('express');
const User = require('../components/datastore/user.model');

// Passport Configuration
require('./local/passport').setup(User);

var router = express.Router();

router.use('/local', require('./local'));

module.exports = router;