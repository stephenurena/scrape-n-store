// Dependency
var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var CommentSchema = new Schema({

  comment: {
    type: String
  }
});

var Comments = mongoose.model("Comments", CommentSchema);

module.exports = Comments;