var Mongoose = require('mongoose');
var mainService = require('../services/main-service');

module.exports = {
	saveAgent: function(data){
		mainService.saveAgent(data)
			.then(function(response){
				console.log(response);
			}, function(err){
				console.log(err);
			})
	},
	removeAgent: function(id){
		mainService.removeAgent(id,
			function(err, response){
				console.log(response);
			})
	},
	saveManufacturer: function(data){
		mainService.saveManufacturer(data)
			.then(function(response){
				console.log(response);
			}, function(err){
				console.log(err);
			})
	},
	saveCar: function(data){
		mainService.saveCar(data)
			.then(function(response){
				console.log(response);
			}, function(err){
				console.log(err);
			})
	},
	getCar: function(){
		mainService.getCar(function(err, response){
				console.log(response);
			})
	}
}