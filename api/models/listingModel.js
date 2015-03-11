var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listingSchema = new Schema({
	
    title: String,
    price: String,
    description: String,
	img: [ Object ],
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', indexed: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', indexed: true },
	
});

module.exports = mongoose.model('Listing', listingSchema);