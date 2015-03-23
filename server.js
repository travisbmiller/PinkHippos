var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var multer = require('multer');
var fs = require('fs')
var User = require('./api/models/userModel');
var listingCtrl = require('./api/controllers/listingCtrl');
var reviewCtrl = require('./api/controllers/reviewCtrl');
var meetupCtrl = require('./api/controllers/meetupCtrl');
var userCtrl = require('./api/controllers/userCtrl');


var port = 8080;


mongoose.connect('mongodb://localhost/pinkHippos');
app.use(bodyParser.json());

app.use(express.static(__dirname+'/public'));
app.use(session({

	secret: 'PINKhippos'

}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({

    usernameField: 'email',

    passwordField: 'password'

  }, function(username, password, done) {

	User.findOne({ email: username }).exec().then(function(user) {

		console.log('User found with: ', user);

		if (!user) {

			return done(null, false);

		};

		user.comparePassword(password).then(function(isMatch) {

			console.log('isMatch: ', isMatch);

			if (!isMatch) {

				return done(null, false);

			};

			return done(null, user);

		});

	});

}));

passport.serializeUser(function(user, done) {

	done(null, user);

});

passport.deserializeUser(function(obj, done) {

	done(null, obj);

});

app.post('/api/login', passport.authenticate('local'), function(req, res) {

	res.status(200).json(req.user);

});

// POST REQUESTS

app.post('/api/register', multer({ dest: './public/uploads/'}), userCtrl.registerUser);

app.post('/api/listing', multer({ dest: './public/uploads/'}), listingCtrl.addListing);

app.post('/api/review', reviewCtrl.addReview);

app.post('/api/meetup', meetupCtrl.addMeetup);

// GET REQUESTS

app.get('/api/listing/:id', listingCtrl.getPublicListing);

app.get('/api/checkUser/:email', userCtrl.checkUser);

app.get('/api/listings/:id', listingCtrl.getListings);

app.get('/api/user/:id', userCtrl.getUser);

// PUT REQUESTS

app.put('/api/listing/:id', listingCtrl.updateListing);

	//buying process --->
app.put('/api/watch/:id', userCtrl.watchItem);

app.put('/api/hold/:id', listingCtrl.holdItem);

app.put('/api/buy/:id', listingCtrl.transferFunds);

// Delete REQUESTS

app.delete('/api/listing/:id', listingCtrl.deleteListing);

app.listen(port)
