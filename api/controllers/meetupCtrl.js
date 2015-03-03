var Meetup = require('../models/meetupModel');

module.exports = {

	addMeetup: function(req, res) {

		console.log(req.body);

		var newMeetup = new Meetup(req.body);

		newMeetup.save(function(err, meetup) {

			if (err) {

				return res.status(500).end();

			};

			return res.json(meetup);

		});

	}

}