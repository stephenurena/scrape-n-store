// dependencies
const express = require('express');
let router = express.Router();
var mongoose = require("mongoose");
let controller = require('../controller/html.controller');

//endpoints
router.get('/', controller.index);
router.get('/scrape', controller.scrape);
router.get('/saved', controller.saved);
router.get('/results', controller.results);

router.put('/id/:id', controller.ids);
router.put('/remove/:id', controller.remove);
router.put('/comment/:id', controller.comment);

//exporting file
module.exports = router;