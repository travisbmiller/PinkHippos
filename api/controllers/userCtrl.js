var User = require('../models/userModel');
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

	getUser: function(req, res) {

		userId = req.params.id;

		User.findById(userId, function(err, user) {

			if (err) {

				res.status(500).json(err);

			} else if (user) {

				res.status(200).json(user);

			} else {

				res.status(404).end();

			}

		});

	}

};