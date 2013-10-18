var ObjectID = require('mongodb').ObjectID,
    mongoose = require('mongoose'),
    restify = require('restify'),
    app = restify.createServer(),
    /*Account = require('./account-model'),
    User = require('./user-model'),
    Company = require('./company-model'),*/
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
    //connect = require('connect'),
    //express = require('express'),
    //app = express();




/* Server Setup */
/*
app.configure(function() {
    app.use(
      function crossOrigin(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", 'Content-Type, X-Requested-With');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        return next();
      }
    );

    app.use(express.cookieParser('keyboard cat'));
    app.use(express.bodyParser());
    app.use(express.session());
    app.use(passport.initialize());
    app.use(passport.session());
});
*/


mongoose.connect('mongodb://localhost/jobagrob', function (err) {
    if(err) throw err;
    console.log('Successfully connected to Jobagrob Test MongoDB.');
});




// additions on top of what passport recommends
// allow post params

//connect().use(connect.cookieParser()).use(connect.session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))


/*
// Connect config here
var connectApp = connect()
    .use(connect.logger())
    .use(connect.bodyParser())
    .use(connect.query())
    .use(connect.cookieParser())
    // And this is where the magic happens
    .use("/api", function (req, res) {
             app.server.emit('request', req, res);
         });
*/

//app.use(express.queryParser()); // added - see what it does...

//app.use(restify.session()); // need...

/* configuring user authentication */

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {

    console.log('authenticate');

    Account.findOne({email: username}, function (err, user) {

        if(!user) return done(null, false, { message: 'user with that email does not exist.' });

        user.comparePassword(password, function (err, isMatch) {
            // TODO error handling here necessary?
            if(!isMatch) return done(null, false, { message: 'Incorrect password.' });
            // correct credentials
            console.log("credentials correct");
            return done(null, user);
        });
        
    });
  }
));

/*

passport.CreateSession =  function (req, res, next) {
  passport.authenticate('local', function(err, user, info){
    if(err || !user)
      return res.json({status: "Failure: "+err});
    req.logIn(user, function (err){
      if(err)
        return res.json({status: "Failure: "+err});
      return res.json({status: "Authenticated"});
    });
  })(req, res, next);
};
*/



passport.serializeUser(function(account, done) {
    console.log('serializing user');
    console.log(account._id);
    done(null, account._id);
});

passport.deserializeUser(function(id, done) {
    console.log('deserializing user');
    console.log(id);
  Account.findById(id, function(err, account) {
    done(err, account);
  });
});




app.on('MethodNotAllowed', function unknownMethodHandler(req, res) {
  if (req.method.toLowerCase() === 'options') {
    var allowHeaders = ['Accept', 'Accept-Version', 'Content-Type', 'Api-Version', 'Origin', 'X-Requested-With']; // added Origin & X-Requested-With
    if (res.methods.indexOf('OPTIONS') === -1) res.methods.push('OPTIONS');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', allowHeaders.join(', '));
    res.header('Access-Control-Allow-Methods', res.methods.join(', '));
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    return res.send(204);
  }
  else
    return res.send({erorr: 'asdasdasdasd'});
});


app.get(/\/docs\/public\/?.*/, restify.serveStatic({
  directory: './public'
}));

app.post('/api/signup', function (req, res, next) {
/*

    var account = new Account({ email: req.params.email, password: req.params.password, type: req.params.type }),
        user,
        company,
        accountId;


    account.save(function (err, account) {
        
        if(err) return next({erorr: 'asdasdasdasd'}); // validation incorrect or account already exists

        accountId = account._id;
        // after account creation, create user or company accounts and link by ID

        if(req.params.type === 'user') {
            user = new User({firstName: req.params.firstName, lastName: req.params.lastName, _accountId: accountId });
            user.save(function (err, user) {
                if(err) return next(err);
                res.send({
                    message: 'user account created.'
                });
                return next();
            });

        } else if (req.params.type === 'company') {
            company = new Company({name: req.params.name, _accountId: accountId});
            company.save(function (err, company) {
                if(err) return next({erorr: 'asdasdasdasd'});
                res.send({
                    message: 'company account created.'
                });
                return next();
            });
        }
    })
*/
});




app.post('/api/login', /*passport.authenticate('local'), */function (req, res, next) {

    console.log('lggin the user in to see if the user is logged in')
/*
    res.send({auth: req.isAuthenticated(), account: req.account, user: req.user});

    console.log('cookies' + JSON.stringify(req.cookies));

    console.log('session' + JSON.stringify(req.session));

    req.session.cookie.expires = false;

*/
});

app.post('/api/checklogin', function(req, res, next) {

/*
    console.log("CHECK")
    console.log('cookies' + JSON.stringify(req.cookies));
    console.log('session' + JSON.stringify(req.session));

    res.send({auth: req.isAuthenticated(), account: req.account, user: req.user});
*/
});

/* when form elements are stored, each element gets a unique ID */
/* the data is sent with the ID's when the users fill it out */
/* when the user submits, only val and ID go through (filtered) */
/* will have a validator for this separate and apart from then static validator */


/*
app.get('/api/validator/login', function(req, res, next) {
    res.send({
        firstName: {
            minlength: 10,
            maxlength: 100
        }
    });
});
*/

/* the validator sends validation on get request
on post request, it can be called


/*
app.get('/hello/:name', function(req, res, next) {
    res.send([{
        name: 'taylor',
        age: req.params.name
    }]);
});
*/


app.listen(8080, function() {
  console.log('%s listening at %s', app.name, app.url);
});




//connectApp.listen(8080);


