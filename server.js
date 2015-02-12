/*
 *Faceboook-Mongo
 *
 *
*/


//modules

var Express = require('express');
var Session = require('express-session');
var Passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var Mongoose = require('mongoose');
var MongoJS = require('mongojs');

//files

var fakeData = require('./seed-data');

var controller = require('./lib/controllers/main-control');

//environment variables

var App = Express();
var port = 9001;
var mongoURI = 'localhost:27017/facebook-mongo'

//middleware  ==================================

App.use(Session({secret: 'SOMETHING_SIKRIT'}));
App.use(Passport.initialize());
App.use(Passport.session());

// Saves our agent

// controller.saveAgent(fakeData[2]);

// Saves our manufacturer

// controller.saveManufacturer(fakeData[3]);

// Saves our car

// controller.saveCar(fakeData[1]);

// Gets our car

// controller.getCar();

// Deletes an agent

// controller.removeAgent('54dc438e2d5b94f9173a1f7b');



Passport.use(new FacebookStrategy({
	clientID: '767050560051516',
	clientSecret: '7f61fe8de4d1f9ffc2061d89073a73bb',
	callbackURL: 'http://localhost:9001/auth/facebook/callback'
}, function(token, refreshToken, profile, done){
	return done(null, profile);
}));

Passport.serializeUser(function(user, done){
	done(null, user);
});

Passport.deserializeUser(function(obj, done){
	done(null, obj);
})

var isAuthed = function(req, res, next){
	if(!req.isAuthenticated()){
		res.redirect('/failure');
	} else {
		next();
	}
}

//endpoints  ==================================
App.get('/me', isAuthed, function(req, res){
	res.json(req.user);
})

App.get('/auth/facebook', Passport.authenticate('facebook'));

App.get('/auth/facebook/callback', 
	Passport.authenticate(
		'facebook', 
		{
			successRedirect: '/me',
			failureRedirect: '/failure'
		}
	)
)


//connection stuff ==========================

var db = MongoJS('facebook-mongo', ['agents', 'cars', 'manufacturers']);

// db.agents.save({
// 	name: 'Jacob Turner',
// 	age: true,
// 	nationality: 27,
// 	occupation: 'Undercover Mentor',
// 	hasLicenseToKill: true,
// 	weapons: [{
// 		kind: 'OS',
// 		name: {},
// 		numberOfRounds: NaN,
// 	}]
// })

// db.agents.find(function(err, docs){
// 	console.log(docs);
// })

// db.agents.remove({name: 'Jacob Turner'});

Mongoose.connect(mongoURI)

Mongoose.connection.once('open', function(){
	console.log('Successfully connected to Mongo via: ' + mongoURI)
})

App.listen(port, function(){
	console.log('Now listening on port: ' + port)
});