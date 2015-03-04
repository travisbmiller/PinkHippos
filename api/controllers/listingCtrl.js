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

		findListing(id)

			.then(function(listing) {

				res.status(200).json(listing);

			}, function(err) {

				res.status(500).json(err);

			});
	},

	buyItem: function(req, res) {

		var user = req.user;

		findListing(req.body.shortId)

			.then(function(listing) {

				user.listings.buyingInPro.push(listingId)

				res.status(200).end();

			}, function(err) {

				res.status(500).json(err);

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

};

var findListing = function(id) {

	var dfd = q.defer();

	Listing.findOne({ shortId: id }, function(err, listing) {

		if (err) {

				dfd.reject(err);

			} else {

				dfd.resolve(listing);

			};

	});

	return dfd.promise;

}