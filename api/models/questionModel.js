var mongoose = require('mongoose');
var Schema = mongoose.Schema();

var questionSchema = new Schema({

	question: { type: String },
	answer: { type: String },
	listingId: { type: String, ref: 'Listing' }

});

module.exports = mongoose.model('Question', questionSchema);