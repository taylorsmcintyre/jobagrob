var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    Account = require('./server/schemas/account-model'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    routes = require('./server/routes'),
    handler = require('restify-errors');

mongoose.connect('mongodb://localhost/jobagrob', function (err) {
    if(err) throw err;
    console.log('Successfully connected to Jobagrob Test MongoDB.');
});


app.configure(function() {
  app.use(express.static('public'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(clientErrorHandler);
  routes.setup(app);
});


function clientErrorHandler(err, req, res, next) {
  if(err.statusCode) return res.send(err.statusCode, err);
  return res.send(new handler.InternalError('Something went wrong.'));
}


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {

    Account.findOne({email: username}, function (err, user) {

        if(!user) return done(null, false, { message: 'user with that email does not exist.' });

        user.comparePassword(password, function (err, isMatch) {
            // TODO error handling here necessary?
            if(!isMatch) return done(null, false, { message: 'incorrect password.' });
            // correct credentials
            return done(null, user);
        });
        
    });
  }
));

passport.serializeUser(function(account, done) {
    done(null, account._id);
});

passport.deserializeUser(function(id, done) {
  Account.findById(id, function (err, account) {
    done(err, account);
  });
});




app.listen(8080, function () {
    console.log('jobagrob active...')
});