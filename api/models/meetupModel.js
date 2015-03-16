var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;

var meetupSchema = new Schema({
	Day: { type: Date },
	Time: { type: Number },
	Address: { type: String, uppercase: true },
	Coords: {
		latitude: { type: Number },
		longitude: { type: Number }
	},
	buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', indexed: true },
	seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', indexed: true },
	sellerApproved: { type: Boolean },
	buyerApproved: { type: Boolean }
});

module.exports = mongoose.model('Meetup', meetupSchema);