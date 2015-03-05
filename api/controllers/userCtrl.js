var User = require('../models/userModel');

module.exports = {

	profile: function(req, res) {

		return req.json(req.user);

	},

	registerUser: function(req, res) {

		console.log(req.body);

		var newUser = new User(req.body);

		newUser.save(function(err, user) {

			if (err) {

				console.log(err);

				return res.status(500).json(err);

			};

			return res.json(user);

		});

	}

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