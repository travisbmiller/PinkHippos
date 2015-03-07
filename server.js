var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./api/models/userModel');
var listingCtrl = require('./api/controllers/listingCtrl');
var reviewCtrl = require('./api/controllers/reviewCtrl');
var meetupCtrl = require('./api/controllers/meetupCtrl');
var userCtrl = require('./api/controllers/userCtrl');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();
var fs = require('fs')
var port = 8080;
var Grid = require('gridfs-stream');

UserController = require('./api/controllers/UserController');
Listing = require('./api/models/listingModel')


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

		debugger;

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

// app.post('/api/register', userCtrl.registerUser);

// app.post('/api/listing', listingCtrl.addListing);

// app.post('/api/review', reviewCtrl.addReview);

// app.post('/api/meetup', meetupCtrl.addMeetup);

// app.post('/api/buy', listingCtrl.buyItem);

// GET REQUESTS

// app.get('/api/listing/:id', listingCtrl.getListing);

// app.get('/api/user/:id', userCtrl.getUser);

// app.get('/api/getReviews', reviewCtrl.getReviews);

app.get('/api/listing/:id', function (req, res) {

		console.log("hit")
		console.log(req.params.id)

        Listing.findById(req.params.id, function (err, doc) {
          
          if (err) return res.send(err);
          res.contentType(doc.img.contentType);
          res.send(doc.img.data);
        });
      


})

app.post('/api/upload', multipartyMiddleware, function (req, res) {
	
	
	var a = new Listing;
    a.img.data = fs.readFileSync(req.files.file.path);
    a.img.contentType = 'image/png';
    a.save(function (err, a) {
      if (err) throw err;
 
      console.error('saved img to mongo');
  })
});

app.listen(port)
