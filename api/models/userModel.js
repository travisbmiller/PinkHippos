var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	firstName: { type: String, required: true, uppercase: true },
	lastName: { type: String, required: true, uppercase: true },
	contact: {
		kind: { type: String, enum: [''] },
		number: { type: Number }
	},
	address: {
		kind: { type: String, enum: [''] },
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
		type: { type: String }
	},
	vehiclePicture: { type: String }
});

module.exports = mongoose.model('User', userSchema);