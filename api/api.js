/* 
install Brew to install Node and Mongo
then run: node mongo-restify.js - to compile the js file and execute this script that starts a web server
then run: mongod to start the mongo database
*/

/* Creation of Server */
var restify = require('restify');

//var db = require('mongojs').connect('localhost:27017/whippextest01', ['devices']);

var server = restify.createServer();

/* Server Setup */
server.use(
  function crossOrigin(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 'Content-Type, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    return next();
  }
);

// allow post params
server.use(restify.bodyParser());

server.on('MethodNotAllowed', function unknownMethodHandler(req, res) {
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
    return res.send(new restify.MethodNotAllowedError());
});

/* include separately */
function isEmpty(object) { 
    for(var i in object) { 
        return false; 
    } 
    return true; 
} 


/* static validator */
var validator = function (errors) {
	this.errors = errors;
};

validator.prototype.check = function (u, v) {
    var errorObj = {};
	for (p in u) {

/*
		if(!v[p]) {
			if(!this.errors[x].check.call(u[p], '')) {
                errorObj[p].push(this.errors[x].errorMsg);	
			}
		}

*/
	    for (x in v[p]) {
            if(!this.errors[x].check.call(u[p], v[p][x])) {
                // push error
                if(!errorObj[p]) errorObj[p] = [];
                errorObj[p].push(this.errors[x].errorMsg);
            }
	    }
	}
    if(isEmpty(errorObj)) return false; // no errors
    return errorObj;
}

/* example use ******

var myValidator = new validator({
    minlength: {
        check: function (num) {
            return this.length > num
        },
        errorMsg: 'minumum length not met'
    },
    maxlength: {
        check: function (num) {
            return this.length < num
        },
        errorMsg: 'maximum length not met'
    }
});

var check = myValidator.check({
    firstName: 'taylor',
    lastName: 'mcintyre'

}, {
    firstName: {
        minlength: 10,
        maxlength: 100
    }
});

console.log(JSON.stringify(check));

******/

/* create instance for validation */

var jgStaticValidator = new validator({
    minlength: {
        check: function (num) {
            return this.length > num
        },
        errorMsg: 'minumum length not met.'
    },
    maxlength: {
        check: function (num) {
            return this.length < num
        },
        errorMsg: 'maximum length not met.'
    },
    required: {
    	check: function (required) {
			if(!required || (required && this.length > 0)) return true;
    		return false;
    	},
    	errorMsg: 'field is required.'
    }
});


/* REST Application Interface */
// requested url via get
// should not be global - but for testing it's ok
var signupRequirements = {
    firstName: {
        minlength: 3,
        maxlength: 40
        required: true
    }
}

server.get('/api/signup', function(req, res, next) {
	res.send(signupRequirements);
	return next();
});

server.post('/api/signup', function(req, res, next) {
	
	var errors = jgStaticValidator.check(req.params, signupRequirements);

	if(!errors) {
		res.send({
			successMsg: 'Valid Data.'
		});
	} else {
		res.send(400, errors);
	}

	return next();
});

/* when form elements are stored, each element gets a unique ID */
/* the data is sent with the ID's when the users fill it out */
/* when the user submits, only val and ID go through (filtered) */
/* will have a validator for this separate and apart from then static validator */


/*
server.get('/api/validator/login', function(req, res, next) {
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
server.get('/hello/:name', function(req, res, next) {
	res.send([{
		name: 'taylor',
		age: req.params.name
	}]);
});
*/


server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
