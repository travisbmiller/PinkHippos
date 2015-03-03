var express = require('express');
var app = express();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var port = 8080;

mongoose.connect('mongodb://localhost/ScoreKeep');
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));

passport.use(new LocalStrategy({

	usernameField: 'email',
	passwordField: 'password'

}, function(username, password, done) {

	User.findOne({ email: username }).exec().then(function(user) {

		if (!user) {
		
			return done(null, false);
		
		}
		
		user.comparePassword(password).then(function(isMatch) {
		
			if (!isMatch) {
		
				return done(null, false);
		
			}
		
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

app.post('/api/register', function(req, res) {

	console.log(req.body);

	var newUser = new User(req.body);

	newUser.save(function(err, user) {

		if (err) {

			return res.status(500).end();

		};

		return res.json(user);

	})

});

app.listen(port)