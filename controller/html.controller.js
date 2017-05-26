// 'use strict';
// dependencies
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const request = require('request');

//modals
let Article = require('../models/scrape.js');

// Mongoose mpromise deprecated - using bluebird promises
let Promise = require('bluebird');

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/scrapenstore");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

//renders homepage
const index = function(req, res) {
	res.render('index');
}

//responds with scraped articles
const scrape = function(req, res) {
	console.log("connected to scrape");
	let URL = "http://www.npr.org/sections/alltechconsidered/195149875/innovation";

	request(URL, function(error, response, html){
		const $ = cheerio.load(html);
		$(".list-overflow").each(function(i, element) {
			
			var headline = $(this).find("a").text();
			// console.log(headline);

			var headlineLink = $(this).find("a").attr("href");

			var summary = $(this).find("p.teaser").text();
			console.log(summary);

			var newArticle = new Article({
				headline: headline,
				link: headlineLink,
				summary: summary
			});
			newArticle.save(function(error, saved) {
				if(error){
					console.log("Error " + error);
				}
			});

		});
	});
	res.redirect('/results');
};

const results = function(req, res) {
	console.log("connected to results");
	var ID = req.params.id;

	  Article.find({saved: false},function(error, found) {
	    // Throw any errors to the console
	    if (error) {
	      return res.render('error');
	    }
	    // If there are no errors, send the data to the browser as a json
	    else {
	      var hbsObject={
	        articles: found
	        }
	      res.render("index", hbsObject);
	    }
	  });
};

module.exports = {
	index,
	scrape,
	results
};