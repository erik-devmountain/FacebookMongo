var express = require('express'),
	session = require('express-session'),
	passport = require('passport'),
	passportFacebook = require('passport-facebook'),
	FacebookStrategy = require('passport-facebook').Strategy,
	port = 9006;
	app = express();

app.listen(port, function(){
	console.log('Now listening on port ' + port);
});

app.use(session({secret: 'thisisSECRET'}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
	new FacebookStrategy({
		clientID: '1504075296519770',
		clientSecret: '73ac9b8f04ce1986fa11cae553e67c97',
		callbackURL: 'http://localhost:9006/auth/facebook/callback'
	}, function(token, refreshToken, profile, done){
		return done(null, profile);
	}
));

passport.serializeUser(function(user, done){
	done(null, user);
});
passport.deserializeUser(function(obj, done){
	done(null, obj);
});

var requireAuth = function(req, res, next){
	if(req.user){
		res.status(200).send(JSON.stringify(req.user));
	} else{
		res.send('Please Login');
	}
};


app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook',
	{
		successRedirect: '/authenticated',
		failureRedirect: '/login'
	})/*, function(req, res){
		res.status(200).redirect('/authenticated');
}*/);
app.get('/me', function(req, res){
	if(req.user){
		res.status(200).send(JSON.stringify(req.user));
	} else {
		res.status(200).send('Please Log In');
	}
});
// app.get('/authenticated', passport.authenticate('facebook',
// 	{

// 	}))