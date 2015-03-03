var Listing = require('../models/listingModel.js');

module.exports = {

	addListing: function(req, res) {
		console.log(req.body);
		var newListing = new Listing(req.body);
		newListing.save(function(err, listing) {
			if (err) {
				return res.status(500).json(err);
			} else {
				return res.status(200).json(listing);
			}
		});
	}

};