var Listing = require('../models/listingModel.js');
var userCtrl = require('./userCtrl');
var User = require('../models/userModel');
var q = require('q');
var fs = require('fs');


module.exports = {

	addListing: function(req, res) {

        // console.log(req.body) // form fields
        console.log(req.files) // form files

        data = JSON.parse(req.body.data) // parsing incoming data.
        
        console.log(data)
  
        var newListing = new Listing(data)

        if (req.files.file) {
            console.log("theres a file")
            newListing.img[0] = {
                url: 'uploads/' + req.files.file.name
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

				return res.status(200).json(listing);

			}, function(err) {

				return res.status(500).json(err);

			});
	},

    getListings: function (req, res) {
        console.log(req.params.id)
        
        Listing.find({"seller" : req.params.id}, function (err, listings) {
            if (err) return res.status(500).json(err)
            return res.status(200).json(listings)
        })
    },

	buyItem: function(req, res) {

		var user = req.user;

		findListing(req.body._id)

			.then(function(listing) {

				console.log('Listing found: ', listing);

				user.listings.purchased.push(listing._id);

				newArr = user.listings.purchased;

				console.log('New array: ', newArr);

				User.findOneAndUpdate({ email: user.email }, { listing: {

					purchased: newArr

				}}, function (user) {

					console.log('Update found this user ', user);

				});

				// user.save(function(err, user) {

				// 	if (err) {

				// 		return res.status(500).json(err);

				// 	} else {

				// 		return res.status(200).json('Save success!');

				// 	}

				// });

			}, function(err) {

				return res.status(500).json(err);

			});

	},

	getPurchased: function(req, res) {

		userCtrl.findUser(req.user._id, 'purchased')

			.then(function(user) {

				res.status(200).json(user.listing.purchased);

			}, function(err) {

				res.status(500).json(err);

			});

	},

	getSold: function(req, res) {},

	getWatching: function(req, res) {}

};

var findListing = function(id) {

	var dfd = q.defer();

	Listing.findOne({ _id: id }, function(err, listing) {

		if (err) {

				dfd.reject(err);

			} else {

				dfd.resolve(listing);

			};

	});

	return dfd.promise;

};

var purchaseCheck = function(listing) {

	if (listing.)

}