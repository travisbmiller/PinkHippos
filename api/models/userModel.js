var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var q = require('q');

var userSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, unique: true, require: true },
	password: { type: String, required: true },
	phone: {
		kind: { type: String, lowercase: true, enum: ['cell', 'home', 'work', 'other'] },
		number: { type: String }
	},
	listings: {

		watching: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing', indexed: true }],
		sellingInPro: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing', indexed: true }],
		buyingInPro: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing', indexed: true }],
		sold: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing', indexed: true }],
		purchased: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing', indexed: true }]

	},
	address: {
		kind: { type: String, enum: ['home', 'work', 'other'] },
		address: { type: String, uppercase: true },
		address2: { type: String, uppercase: true },
		city: { type: String, uppercase: true },
		state: { type: String, uppercase:true },
		zip: { type: Number }
	},
	profilePicture: { type: String },
	vehicleInfo: {
		make: { type: String },
		model: { type: String },
		color: { type: String },
		year: { type: String },
		completed: { type: Boolean, default: false, required: true }
	},
	vehiclePicture: { type: String }
});

userSchema.pre('save', function(next) {

	var user = this;

	if (!user.isModified('password')) {

		return next();

	}

	bcrypt.genSalt(12, function(err, salt) {

		if (err) {

			return next(err);

		}

		bcrypt.hash(user.password, salt, function(err, hash) {

			user.password = hash;

			return next();

		});

	});

});

userSchema.methods.comparePassword = function(pass) {

	var deferred = q.defer();

	bcrypt.compare(pass, this.password, function(err, isMatch) {

		if (err) {

			deferred.reject(err);

		}

		else {

			deferred.resolve(isMatch);

		}

	});

	return deferred.promise;

};

module.exports = mongoose.model('User', userSchema);