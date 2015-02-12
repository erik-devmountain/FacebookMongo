var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var schema = new Schema({
	name: { type: String, required: true, uniqueness: true },
	age: { type: Number, min: 16, max: 90 },
	nationality: { type: String, enum: ['British', 'English', 'Irish', 'Welch', 'Scottish'] },
	occupation: String,
	hasLicenseToKill: { type: Boolean, default: true },
	weapons: [{
		kind: { type: String, required: true },
		name: { type: String, required: true },
		numberOfRounds: { type: Number, required: true }
	}]
})

module.exports = Mongoose.model('Agent', schema);