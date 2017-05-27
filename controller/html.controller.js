// 'use strict';
// dependencies
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const request = require('request');

//models
let Article = require('../models/scrape.js');

// Mongoose mpromise deprecated - using bluebird promises
let Promise = require('bluebird');
mongoose.Promise = Promise;

// Database configuration with mongoose
let URI = "mongodb://localhost/scrapenstore"
mongoose.connect(URI);
let db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

//controllers for routes in routes/html.js
const index = function(req, res) {
	res.render('index');
}

const saved = function(req, res) {
	console.log("connected to saved");
	Article.find({saved: true}, function(error, found) {
		if(error){
			res.render('error');
		}
		else{
			var hbsObject = {
				articles: found
			}
			res.render("saved", hbsObject);
		}
	})
}

//responds with scraped articles
const scrape = function(req, res) {
	console.log("connected to scrape");
	let URL = "http://www.npr.org/sections/alltechconsidered/195149875/innovation";

	request(URL, function(error, response, html){
		const $ = cheerio.load(html);
		$(".item has-image").each(function(i, element) {
			
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
				else{
					console.log(doc);
				}
			});

		});
	});
	res.redirect('/results');
};

const results = function(req, res) {
	console.log("connected to results");
	var ID = req.params.id;

	  Article.find({saved: false},function(err, results) {
	    // Throw any errors to the console
	    if (err) {
	      return res.render('error');
	    }
	    // If there are no errors, send the data to the browser as a json
	    else {
	      var hbsObject={
	        articles: results
	        }
	      res.render("results", hbsObject);
	    }
	  });
};

const ids = function(req, res){
	console.log("connected to ids");

  var ID= req.params.id;

  Article.update({_id: ID},{ $set:{saved: true} }, function(error, updated){
      if (error) {
      res.render('error');
    }
    else{
      res.redirect('/results');
    }
  });
};

const remove = function(req, res){

  var ID= req.params.id;

  Article.update({_id: ID},{ $set:{saved: false} }, function(error, updated){
      if (error) {
      res.render('error');
    }
    else{
      res.redirect('/saved');
    }
  })

};

const comment = function(req, res){

  var ID= req.params.id;
  var YourComment= req.body.comment;

  var newComment = new Comment({
    comment: YourComment
  });

  Article.findOneAndUpdate({_id: ID}, { $push: { "comments": newComment } }, function(error, documentUpdated) {
      if (error) {
      res.render('error');
    }
    else{
      res.redirect('/saved');
    }
  });

}



module.exports = {
	index,
	scrape,
	saved,
	results,
	ids,
	remove,
	comment
};