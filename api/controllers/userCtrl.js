var User = require('../models/userModel');

module.exports = {
	profile: function(req, res) {
		return req.json(req.user);
	}
};