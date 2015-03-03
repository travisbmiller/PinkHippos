var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
	item: { type: String },
	review: {
		buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', indexed: true },
		comment: { type: String },
		date: { type: Date },
		stars: { type: Number }
	},
	comment: {
		seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', indexed: true },
		response: { type: String },
		date: { type: Date }
	}

});

module.exports = mongoose.model('Review', reviewSchema);