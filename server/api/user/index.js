'use strict';

const express = require('express');
const controller = require('./user.controller');
const auth = require('../../auth/auth.service');

const router = express.Router();

router.get('/me', auth.isAuthenticated(), controller.me);

module.exports = router;
