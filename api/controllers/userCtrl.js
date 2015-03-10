var User = require('../models/userModel');

module.exports = {

	profile: function(req, res) {

		return req.json(req.user);

	},

	registerUser: function(req, res) {

		console.log(req.body) // form fields
        console.log(req.files.file.name) // form files

        data = JSON.parse(req.body.data) // parsing incoming data.
        console.log(data)
  
        var newUser = new User(data)

        if (req.files.file.name) {
            console.log("theres a file")
            newUser.profilePicture = 'uploads/' + req.files.file.name
        }

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