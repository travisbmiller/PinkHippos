var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listingSchema = new Schema({
	name: { type: String },
	shortId: { type: Number },
	price: { type: Number },
	pictures: {
			id: { type: Number }
		},
	description: { type: String },
	notifications: {
			id: { type: Number },
			notification:  { type: String }
		},
	messages: {
			id: { type: Number },
			message: { type: String }
		},
	seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', indexed: true },
	buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', indexed: true },
	fundsApproved: { type: Boolean },
	fundsTransferred: { type: Boolean }
});

module.exports = mongoose.model('Listing', listingSchema);