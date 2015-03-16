var Review = require('../models/reviewModel');

module.exports = {

	addReview: function(req, res) {
		console.log(req.body);
		
		var newReview = new Review(req.body);
		
		newReview.save(function(err, review) {
			
			if (err) {
				return res.status(500).json(err);
			} else {
				return res.status(200).json(review);
			}
		});
	}

};