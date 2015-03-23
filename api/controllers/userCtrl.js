var User = require('../models/userModel');
var q = require('q');
var fs = require('fs')
var easyimg = require('easyimage');

module.exports = {

	profile: function(req, res) {

		return req.json(req.user);

	},

	registerUser: function(req, res) {

        // File path req.files.file.name

        // resizing image
        easyimg.rescrop({
             src:'./public/uploads/' + req.files.file.name , dst:'./public/uploads/' + req.files.file.name,
             width:500, height:500,
             cropwidth: 400, cropheight:400,
             x:0, y:0,
             gravity: "Center",
             fill: true
          }).then(
          function(image) {
             console.log('Resized and cropped: ' + image.width + ' x ' + image.height);
          },
          function (err) {
            console.log(err);
          }
        );
                

        // parsing incoming data.       
        data = JSON.parse(req.body.data) 
        console.log(data)
  

        // creating new User
        var newUser = new User(data)

        if (req.files.file.name) {
            console.log("theres a file")
            newUser.profilePicture = 'uploads/' + req.files.file.name
        }


        //Saving new user
        newUser.save(function(err, user) {
                console.log("saving")
                 if (err) {
                     console.log("err", err)
                     return res.status(500).json(err);
                
                 } else {
                    console.log("success")
                     return res.status(200).json(user);
                
                 }
                
             });

	},

	checkUser: function(req, res) {

		var userEmail = req.params.email;

		User.findOne({ email: userEmail }, function(err, user) {

			if (err) {

				res.status(500).end();

			} else if (!user) {

				res.status(404).end();

			} else {

				res.status(200).end();

			};

		});

	},

	getUser: function(req, res) {

		userId = req.params.id;

		User.findById(userId)

			.populate('listings.watching')
			.populate('listings.purchased')
			.populate('listings.sold')
			.populate('listings.sellingInPro')
			.populate('listings.buyingInPro')

			.exec(function(err, user) {

				if (err) {

					res.status(500).json(err);

				} else if (user) {

					user.listings.watching[0].populate('seller');

					res.status(200).json(user);

				} else {

					res.status(404).end();

				}

			});

	},

	findUser: function(id, field) {

		var dfd = q.defer();

		User.findById(id)

			.populate(field).exec()

			.then(function (user) {

				dfd.resolve(user);

			}, function (err) {

				dfd.reject(err);

			});

		return dfd.promise;

	},

	watchItem: function(req, res) {
		itemId = req.params.id;

		var user = User.findOne({_id: item.buyer}).exec().then(function(user) {
		user.listings.watching.push(item);
		user.notifications.push({
			body: "You are watching listing: '" + item.title + "'"
		});
		user.save(function(err) {
			console.log("---> buyer notification sent");
		});
	});
	}

};