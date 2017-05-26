// dependencies
const express = require('express');
let router = express.Router();
let controller = require('../controller/html.controller');

//endpoints
router.get('/', controller.index);
router.get('/scrape', controller.scrape);
router.get('/results', controller.results);

//exporting file
module.exports = router;