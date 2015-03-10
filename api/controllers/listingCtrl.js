var Listing = require('../models/listingModel.js');
var q = require('q');
var fs = require('fs');


module.exports = {

	addListing: function(req, res) {

        console.log(req.body) // form fields
        console.log(req.files.file.name) // form files

        data = JSON.parse(req.body.data) // parsing incoming data.
        console.log(data)
  
        var newListing = new Listing(data)

        if (req.files.file.name) {
            console.log("theres a file")
            newListing.img[0] = {
                url: 'public/' + req.files.file.name
            } 
        }

        newListing.save(function(err, listing) {
                console.log("saving")
                 if (err) {
                     console.log("err", err)
                     return res.status(500).json(err);
                
                 } else {
                    console.log("success")
                     return res.status(200).json(listing);
                
                 }
                
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

				user.listings.buyingInPro.push(listingId);

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