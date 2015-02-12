var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;


var schema = new Schema({
	name: { type: String, required: true, uniqueness: true},
	manufacturer: { type: String, ref: 'Manufacturer', required: true },
	cylindars: Number,
	topSpeed: Number,
	gears: Number,
	doors: Number,
	msrp: Number
})

module.exports = Mongoose.model('Car', schema)