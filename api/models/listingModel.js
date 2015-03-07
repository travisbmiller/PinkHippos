var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listingSchema = new Schema({
	title: String,
	img: { data: Buffer, contentType: String }
	
});

module.exports = mongoose.model('Listing', listingSchema);