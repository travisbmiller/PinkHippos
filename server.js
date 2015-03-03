var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./api/models/userModel');
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

	console.log(req);
	console.log(res);
	res.status(200).json(req.user);

});

app.post('/api/register', userCtrl.registerUser);

app.listen(port)
