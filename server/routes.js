var passport = require('passport'),
    handler = require('restify-errors'),
	Account = require('./schemas/account-model'),
    User = require('./schemas/user-model'),
    Job = require('./schemas/job-model'),
    Company = require('./schemas/company-model');

function formatResponse (msg) {
	return {
		message: msg
	}
}

/* middlewares */
function logOut(req, res, next) {
	delete req.account;
	req.logOut();
	return next();
}

function checkAuth(req, res, next) {
	if(!req.isAuthenticated()) return next(new handler.NotAuthorizedError('Not logged in.'));
	return next();
}

function account(req, res, next) {
	Account.getAccountInstanceById(req.user._id, function (err, account) {
		req.account = account;
		return next();
	});
}

function setup(app) {

	app.post('/api/signup', function (req, res, next) {
	
	    var account = new Account({ email: req.body.email, password: req.body.password, type: req.body.type }),
	        user,
	        company,
	        accountId;

	    account.save(function (err, account) {

	    	// account creation error handling
	    	if(err) {
		        if(err.name === 'MongoError') return next(new handler.InvalidArgumentError('Account with that email already exists.'));
		        // TODO figure out more elegant way to report validation errors
		        //if(err.name === 'ValidationError') return next(new handler.InvalidContentError(err));
				if(err.name === 'ValidationError') return next(new handler.InvalidContentError('Validation Error.'));
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

	app.post('/api/login', logOut, passport.authenticate('local'), function (req, res, next) {

	    Account.findById(req.user._id, function (err, account) {
	    	if(err) return next(err);
	    	res.send(formatResponse('logged in.'));
	    })
		
	});

	app.post('/api/logout', logOut);

/*
	app.post('/api/checklogin', function(req, res, next) {
	    res.send({auth: req.isAuthenticated()});
	});
*/

	app.post('/api/checklogin', checkAuth, account, function (req, res, next) {

		req.account.getFirstName(function (err, fname) {
			res.send({
				name: fname
			});
		})

	});

	/* JOBS */
	app.post('/api/jobs/create', function (req, res, next) {
		var job = new Job(req.body);

		job.save(function (err, job) {
			res.send(job);
		});
	});

}
 
exports.setup = setup;