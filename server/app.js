'use strict';

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
const ip = "localhost";

// mongo connection
mongoose.connect('mongodb://localhost/misc', {useNewUrlParser: true, useUnifiedTopology: true});

// setup server
var server = require('http').createServer(app);
server.listen(port, ip, function () {
  console.log("Express server listening on 3000!");
});

require('./config/express')(app);
require('./config/routes')(app);