var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listingSchema = new Schema({
	name: { type: String },
	price: { type: Number },
	pictures:{[
			{
				id: { type: Number }
			}
		]},
	description:
	notifications: {[
			{
				id: { type: Number },
				notification: { type: String }
			}
		]},
	messages: {[
			{
				id: { type: Number },
				message: { type: String }
			}
		]},
	seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', indexed: true },
	buyer: { type: String },
	fundsApproved: { type: Boolean },
	fundsTransferred: { type: Boolean }
});

module.exports = mongoose.model('Listing', listingSchema);