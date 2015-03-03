var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var meetupSchema = new Schema({
	Day:
	Time:
	Address:
	Coords: {
		latitude:
		longitude:
	},
	sellerApproved:
	buyerApproved:
});

module.exports = mongoose.model('Meetup', meetupSchema);