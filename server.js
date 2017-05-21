//dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const request = require('request');
//may need methodOverride, verify before deployment

// Mongoose mpromise deprecated - using bluebird promises
let Promise = require('bluebird');

//const for application
const app = express();
const port = process.env.PORT || '3000';
const db = require('./app/models');
const config = require('./config');
const handlebars = require('./config/handlebars');


//views
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'hbs');

//public- static files (if any)
app.use('/public', express.static(path.join(__dirname, 'public')));


//routes
app.use('/', require('.app/routes/html'));
//additional routes may follow;

//error verify useage, neccessary for this type of app?
// app.use(function (err, req, res, next) {
// 	res.locals.message = err.message;
// 	res.locals.error = req.app.get('env') === 'development' ? err : {};

// 	//render error(s)
// 	res.status(err.status || 500);
// 	res.render('error', {err});
// });

//mongoose db connection
mongoose.Promise = Promise;

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/scrape-n-store");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

module.exports = app;