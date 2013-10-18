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
    lastName: {
        maxlength: 60,
        required: true
    },
    email: {
        required: true,
        maxlength: 70
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