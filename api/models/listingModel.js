var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listingSchema = new Schema({
	name:
	price:
	pictures:{[
			{

			}
		]},
	description:
	notifications: {[
			{

			}
		]},
	messages: {[
			{

			}
		]},
	seller:
	buyer:
	fundsApproved: { type: Boolean },
	fundsTransferred: { type: Boolean }
});

module.exports = mongoose.model('Listing', listingSchema);