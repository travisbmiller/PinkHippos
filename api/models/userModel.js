var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	contact: {
		kind: { type: String, enum: },
		number: { type: Number }
	},
	address: {
		kind: { type: String, enum: },
		address: { type: String },
		address2: { type: String },
		city: { type: String },
		state: { type: String },
		zip: { type: Number }
	},
	profilePicture: { type: String },
	vehicleInfo: {
		make: { type: String },
		model: { type: String },
		color: { type: String },
		type: { type: String }
	},
	vehiclePicture: { type: String }
});

module.exports = mongoose.model('User', userSchema);