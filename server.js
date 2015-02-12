var Express = require('express');
var Session = require('express-session');
var Passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var App = Express();

//middleware

App.use(Session({secret: 'SOMETHING_SIKRIT'}));
App.use(Passport.initialize());
App.use(Passport.session());

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
	))

App.listen(9001, function(){
	console.log('Now listening on port: 9001')
});