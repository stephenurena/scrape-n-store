//mongoose db connection
//add all of this to models view
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


module.exports = mongoose;