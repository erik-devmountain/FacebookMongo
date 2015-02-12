var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;


var schema = new Schema({
	_id: { type: String, require: true, uniqueness: true },
	name: { type: String, required: true, uniqueness: true },
	nationality: { type: String, require: true }
})

module.exports = Mongoose.model('Manufacturer', schema)