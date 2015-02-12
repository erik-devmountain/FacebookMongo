var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var schema = new Schema({
	name: { type: String, required: true, uniqueness: true},
	age: Number,
	nationality: String,
	occupation: String,
	hasLicenseToKill: { type: Boolean, default: true },
	weapons: [{
		kind: { type: String, required: true },
		name: { type: String, required: true },
		numberOfRounds: { type: Number, required: true }
	}]
})

module.exports = Mongoose.model('Agent', schema)