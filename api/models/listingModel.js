var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listingSchema = new Schema({
	
    title: String,
    price: String,
    description: String,
	img: [ Object ]
	
});

module.exports = mongoose.model('Listing', listingSchema);