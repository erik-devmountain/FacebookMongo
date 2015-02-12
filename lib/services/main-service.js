var Mongoose = require('mongoose');
var Agent = require('../models/agent');
var Manufacturer = require('../models/manufacturer');
var Car = require('../models/car');


module.exports = {
	saveAgent: function(data){
		return Agent.create(data);
	},
	removeAgent: function(id, cb){
		return Agent.remove({_id: id}, cb);
	},
	saveManufacturer: function(data){
		return Manufacturer.create(data);
	},
	saveCar: function(data){
		return Car.create(data);
	},
	getCar: function(cb){
		return Car.find().populate('manufacturer')
		.exec(cb)
	}
}