var Listing = require('../models/listingModel.js');
var q = require('q');

module.exports = {

	addListing: function(req, res) {

		console.log(req.body);
		
		var newListing = new Listing(req.body);

		createShortId()

			.then(function(shortId) {

				newListing.shortId = shortId;
		
				newListing.save(function(err, listing) {
				
					if (err) {
				
						return res.status(500).json(err);
				
					} else {
				
						return res.status(200).json(listing);
				
					}
				
				});

			}, function(err) {

				console.log('Create shortId failed with this error: ', err);

			});
	
	}

};

var createShortId = function() {

	var shortId;

	var dfd = q.defer();

	Listing.find({}, function(err, listings) {

		if (err) {

			dfd.reject(err);

		} else {

			shortId = listings.length++;

			dfd.resolve(shortId);

		};

	});

	return dfd.promise;

}