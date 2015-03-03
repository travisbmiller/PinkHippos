var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
	item: { type: String },
	review: {
		buyer: { type: String },
		comment: { type: String },
		date: { type: Date },
		stars: { type: Number }
	},
	comment: {
		seller: { type: String },
		response: { type: String },
		date: { type: Date }
	}

});

module.exports = mongoose.model('Review', reviewSchema);