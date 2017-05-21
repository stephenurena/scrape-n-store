const express = require('express');
const router = express.Router();
const controller = require('../controller/html.controller');

//endpoints
router.get('/', controller.index);

//exporting file
module.exports = router;