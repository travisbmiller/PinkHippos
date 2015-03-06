var User = require('../models/userModel');
var q = require('q');

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

		User.findById(userId, function(err, user) {

			if (err) {

				res.status(500).json(err);

			} else if (user) {

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

	}

};