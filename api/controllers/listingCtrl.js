var Listing = require('../models/listingModel.js');
var q = require('q');

module.exports = {

	addListing: function(req, res) {

		debugger;

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
	
	},

	getListing: function(req, res) {

		var id = parseInt(req.params.id);

		console.log(id);

		Listing.findOne({ shortId: id }, function(err, listing) {

			if (err) {

				res.status(500).json(err);

			} else {

				res.status(200).json(listing);

			}

		});

	},

	getPurchased: function(req, res) {

		console.log('req.body.user: ', req.body);

		buyerId = req.body.user._id;

		Listing.find({ buyer: buyerId }, function(err, listings) {

			if (err) {

				res.status(500).json(err);

			} else {

				res.status(200).json(listings);

			};

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

			console.log('Listings found: ', listings);

			shortId = listings.length + 1;

			console.log('Short ID generated: ', shortId);

			dfd.resolve(shortId);

		};

	});

	return dfd.promise;

}