var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
	item: { type: String },
	review: {
		buyer: { type: String, ref: 'User', indexed: true },
		comment: { type: String },
		date: { type: Date },
		stars: { type: Number }
	},
	comment: {
		seller: { type: String, ref: 'User', indexed: true },
		response: { type: String },
		date: { type: Date }
	}

});

module.exports = mongoose.model('Review', reviewSchema);
