var Listing = require('../models/listingModel.js');
var userCtrl = require('./userCtrl');
var User = require('../models/userModel');
var Review = require('../models/reviewModel');
var q = require('q');
var fs = require('fs');


module.exports = {

	addListing: function(req, res) {

        // console.log(req.body) // form fields
        //console.log(req.files) // form files

        data = JSON.parse(req.body.data) // parsing incoming data.
        // console.log('File Name: ', req.files.file.name);
        // console.log('Data: ', data);


        if (req.files.file) {
            console.log("theres a file")
            data.img = [{ url: '/uploads/' + req.files.file.name}];
            console.log("after file is added", newListing)
        }

        var newListing = new Listing(data)

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

	getPublicListing: function(req, res) {

		var dfd1 = q.defer();

		var dfd2 = q.defer();

		Listing
            .find({shortId: req.params.id})
            .populate('seller', 'firstName')
            .populate('img')

            .exec(function (err, listing) {
              // if (err) return res.status(500).send(err);
              // return res.status(200).json(listing)

              if (err) {

              	dfd1.reject(err);

              	return res.status(500).json(err);

              } else {

              	if (!listing) {

              		return res.status(404).end();

              	}

              	console.log('Listing Found: ', listing);

              	dfd1.resolve(listing);

              	Review

              		.find({seller: listing.seller})

              			.populate('seller', 'firstName')
              			.populate('buyer', 'firstName')

              			.exec(function(err, reviews) {

	              			if (err) {

	              				dfd2.reject(err);

	              			} else {

	              				console.log('Reviews Found: ', reviews);

	              				dfd2.resolve(reviews);

	              			};


	              		})

              };
        });

        q.all([dfd1.promise, dfd2.promise])


        	.then(function(data) {

        		var resObj = {

        			listing: data[0],
        			reviews: data[1]

        		};

        		return res.status(200).json(data);

        	}, function(err) {

        		return res.status(500).json(err);

        	});

	},

    getListings: function (req, res) {
        console.log('ID from getListing:', req.params.id);

      Listing.find({"seller" : req.params.id}, function (err, listings) {
          if (err) return res.status(500).json(err)
          return res.status(200).json(listings)
      })
  },

	holdItem: function(req, res) {

		req.body.updatedAt = Date.now();
		Listing.findOneAndUpdate({_id: req.params.id}, req.body, function(err, item) {
			if (item.status !== 'purchased') {
				res.json(item);
				item.status = 'inProgress';
				item.save(function(err) {
					console.log('---> item status changed');
				});
				console.log('This is the item: ', item);

				// add buyer to listing
				console.log(req.body.user);
				item.buyersInPro.push(req.body.user);

				// notify seller
				var user = User.findOne({ _id: item.seller }).exec().then(function(user) {
					user.listings.sellingInPro.push(item);
					user.notifications.push({
						body: "Listing: '" + item.title + "' has been reserved by: " + req.body.user + "."
					});
					user.save(function(err) {
						console.log("---> seller notification sent");
					});
				});

				// notify buyer
				var user = User.findOne({ _id: item.buyersInPro }).exec().then(function(user) {
					user.listings.buyingInPro.push(item);
					user.notifications.push({
						body: "You have reserved listing: '" + item.title + "'"
					});
					user.save(function(err) {
						console.log("---> buyer notification sent");
					});
				});
			}
		});


		// var user = req.user;
		//
		// console.log('Here is req.params: ', req.params);
		//
		// findListing(req.params.id)
		//
		// 	.then(function(listing) {
		//
		// 		console.log('Listing found: ', listing);
		//
		// 		listing.status = 'inProgress';
		//
		// 		user.listings.buyingInPro.push(listing._id);
		//
		// 		newArr = user.listings.buyingInPro;
		//
		// 		console.log('New array: ', newArr);
		//
		// 		User.findOneAndUpdate({ email: user.email }, { listing: {
		//
		// 			buyingInPro: newArr
		//
		// 		}}, function (user) {
		//
		// 			console.log('Update found this user ', user);
		//
		// 		});
		//
		// 		Listing.findOneAndUpdate({ _id: req.params.id }, { listing: {
		//
		// 			status: 'inProgress'
		//
		// 		}}, function (listing) {
		//
		// 			res.status(200).json(user);
		//
		// 		})
		//
		//
		// 	}, function(err) {
		//
		// 		return res.status(500).json(err);
		//
		// 	});

	},

	transferFunds: function(req, res) {

		req.body.updatedAt = Date.now();
		Listing.findOneAndUpdate({_id: req.params.id}, req.body, function(err, item) {
			res.json(item);
			if (item.status === 'inProgress') {
				item.status = 'purchased';
				item.save(function(err) {
					console.log('---> item status changed');
				});
				console.log('This is the item: ', item);
				//notify seller
				var user = User.findOne({_id: item.seller}).exec().then(function(user) {
					user.listings.sold.push(item);
					user.notifications.push({
						body: "Listing: '" + item.title + "' has been purchased."
					});
					user.save(function(err) {
						console.log("---> notification sent");
					});
				});
				// notify buyer
				var user = User.findOne({_id: item.buyer}).exec().then(function(user) {
					user.listings.purchased.push(item);
					user.notifications.push({
						body: "You have purchased listing: '" + item.title + "'"
					});
					user.save(function(err) {
						console.log("---> buyer notification sent");
					});
				});
			}
		});


		// var user = req.user;
		//
		// findListing(req.body._id)
		//
		// 	.then(function(listing) {
		//
		// 		user.listings.purchased.push(listing._id);
		//
		// 		newArr = user.listings.purchased;
		//
		// 		User.findOneAndUpdate({ email: user.email }, { listing: {
		//
		// 			buyingInPro: newArr
		//
		// 		}}, function (user) {
		//
		// 			res.status(200).json(user);
		//
		// 		});
		//
		// 		Listing.findOneAndUpdate({ _id: req.body._id }, { listing: {
		//
		// 			status: 'purchased'
		//
		// 		}}, function (listing) {
		//
		// 			res.status(200).json(user);
		//
		// 		})
		//
		// 	}, function(err) {
		//
		// 		return res.status(500).json(err);
		//
		// 	});

	},

	getPurchased: function(req, res) {

		userCtrl.findUser(req.user._id, 'purchased')

			.then(function(user) {

				res.status(200).json(user.listing.purchased);

			}, function(err) {

				res.status(500).json(err);

			});

	},

	updateListing: function(req, res) {
		req.body.updatedAt = Date.now();
		console.log('##### req.params: ', req.params);
		Listing.findOneAndUpdate({_id: req.params.id}, req.body, function(err, item) {
			res.json(item);
			console.log('This is the item: ', item);
			//notify user
			var user = User.findOne({_id: item.seller}).exec().then(function(user) {
				user.notifications.push({
					body: "Listing: '" + item.title + "' has been updated!!"
				});
				user.save(function(err) {
					console.log("---> notification sent");
				});
			});
		});
	},

    deleteListing: function (req, res) {
        Listing
            .find({ _id: req.params.id })
            .remove()
            .exec(function (err, listing) {
                if (err) return res.status(500).json(err)
                    return res.status(200).json("your listing was deleted")
            })
    }


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

	if (listing) {}

}
