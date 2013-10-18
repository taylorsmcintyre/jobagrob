var passport = require('passport'),
    handler = require('restify-errors'),
	Account = require('./schemas/account-model'),
    User = require('./schemas/user-model'),
    Company = require('./schemas/company-model');

function formatResponse (msg) {
	return {
		message: msg
	}
}

function setup(app) {


	app.post('/api/login', passport.authenticate('local'), function (req, res, next) {
	    User.findById(req.user._id, function(err, account) {
	    	res.send({acct: account});
	    });
		//res.send({auth: req.isAuthenticated(), user: req.user});
	});

	app.post('/api/signup', function (req, res, next) {
	

	    var account = new Account({ email: req.body.email, password: req.body.password, type: req.body.type }),
	        user,
	        company,
	        accountId;

	    account.save(function (err, account) {
	        
	    	// account creation error handling
	    	if(err) {
		        if(err.name === 'MongoError') return next(new handler.InvalidArgumentError('Account with that email already exists.'));
		        if(err.name === 'ValidationError') return next(new handler.InvalidContentError('Validation unsuccessful.'));
	    		return next(err);
	    	}

	        accountId = account._id;

	        if(req.body.type === 'user') {
	            user = new User({firstName: req.body.firstName, lastName: req.body.lastName, _accountId: accountId });
	            user.save(function (err, user) {
	                if(err) return next(err);
	                return res.send(formatResponse('user account created.'));
	            });

	        } else if (req.body.type === 'company') {
	            company = new Company({name: req.body.name, _accountId: accountId});
	            company.save(function (err, company) {
	                if(err) return next(err);
	                return res.send(formatResponse('company account created.'));
	            });
	        }

	    })
	
	});

	app.post('/api/checklogin', function(req, res, next) {
	    res.send({auth: req.isAuthenticated(), user: req.user});
	});

}
 
exports.setup = setup;