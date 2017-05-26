// dependencies
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const request = require('request');

const express = require('express');
let router = express.Router();
let controller = require('../controller/html.controller');

// Mongoose mpromise deprecated - using bluebird promises
let Promise = require('bluebird');

//endpoints
router.get('/', controller.index);

//exporting file
module.exports = router;