var passport = require('passport'),
    handler = require('restify-errors');

function setup(app) {


	app.post('/api/login', passport.authenticate('local'), function (req, res, next) {
	    res.send({auth: req.isAuthenticated(), user: req.user});
	});

	app.post('/api/signup', function (req, res, next) {
	
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
	
	});

	app.post('/api/checklogin', function(req, res, next) {
	    res.send({auth: req.isAuthenticated(), user: req.user});
	});

}
 
exports.setup = setup;