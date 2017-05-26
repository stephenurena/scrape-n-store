//dependencies
const express = require('express');
const bodyParser = require('body-parser');
const logger = require("morgan");
const methodOverride = require('method-override');
const exphbs = require("express-handlebars");
const path = require("path");


//const for application, initialize express
const app = express();
const PORT = process.env.PORT || '3000';
app.listen(PORT, function(err, res) {
	if(err) throw err;
	console.log("App running on Port:" + PORT);
})

// let db = require('./app/models');

//body-parser
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
//method override
app.use(methodOverride("_method"));

//views
// app.set('views', path.join(__dirname, 'app', 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//public- static files (if any)
app.use(express.static("public"));


//routes
let routes = require('./routes/html');
// app.use('/', routes);
app.get('/', function(req, res) {
	res.render("index");
})
//additional routes may follow;

//error verify useage, neccessary for this type of app?
// app.use(function (err, req, res, next) {
// 	res.locals.message = err.message;
// 	res.locals.error = req.app.get('env') === 'development' ? err : {};

// 	//render error(s)
// 	res.status(err.status || 500);
// 	res.render('error', {err});
// });


module.exports = app;