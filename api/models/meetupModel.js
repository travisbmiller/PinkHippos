var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var meetupSchema = new Schema({
	Day: { type: Date },
	Time: { type: Number },
	Address: { type: String, uppercase: true },
	Coords: {
		latitude: { type: Number },
		longitude: { type: Number }
	},
	sellerApproved: { type: Boolean },
	buyerApproved: { type: Boolean }
});

module.exports = mongoose.model('Meetup', meetupSchema);