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
    var schemas = {};
	this.errors = errors;

    this.addSchema = function (name, schema) {
        schemas[name] = schema;
    }

    this.getSchema = function (name) {
        // returns schema with error messages attached to properties
        return schemas[name];
    }

    this.check = function (u, v) {
        var errorObj = {},
            v = schemas[v];

        for (p in u) {
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

};



// define a new validator with your validation rules
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
        errorMsg: 'maximum length surpassed.'
    },
    required: {
    	check: function (required) {
			if(!required || (required && this.length > 0)) return true;
    		return false;
    	},
    	errorMsg: 'field is required.'
    }
});

// add a schema for an object
jgStaticValidator.addSchema('signup', {
    firstName: {
        maxlength: 40,
        required: true
    },
    email: {
        required: true
    },
    lastName: {
        maxlength: 60,
        required: true
    },
    password: {
        minlength: 6,
        maxlength: 30,
        required: true
    }
});


/* validator instances have three methods, check, addSchema and getSchema
    check: returns an error object if the passed object doesn't meet the schemas requirements
           returns false if there are no errors
    
    addSchema: add a new scheme for validation
    
    getSchema: returns a schema by its name
*/


server.post('/api/signup', function(req, res, next) {
	
	var errors = jgStaticValidator.check(req.params, 'signup');

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
