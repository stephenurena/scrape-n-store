// Require mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
	headline:{
		type: String,
		required: true,
		unique: true
	},
	summary:{
		type: String,
		required: true
	},
	link: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	},
	comments: {
		type: Array
	},
	saved: {
		type: Boolean,
		default: false
	}
})

let Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;