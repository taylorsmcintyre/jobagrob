var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10,
    ObjectID = require('mongodb').ObjectID,
    User = require('./user-model'),
    Company = require('./company-model'),
    handler = require('restify-errors'),
    _ = require('underscore'),
    validate = require('../plugins/validation-regexp.js');

require('../plugins/validation-augments.js');

var accountSchema = new Schema({
    email: {
        type: String,
        required: true,
        validate: validate.regexp.email,
        unique: true,
        maxLength: 50,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 30,
        trim: true
    },
    type: {
        type: String,
        enum: ['user', 'company']
    }
});

accountSchema.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

accountSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

/* Returns either a user model or a company model instance */
accountSchema.statics.getAccountInstanceById = function (id, cb) {
    // TODO - this error is replicated above
    var noAccountError = new handler.InvalidCredentialsError('Account with that ID does not exist');
    this.findById(id, function (err, account) {
        if(err) return next(noAccountError);
        // find user with this accountId
        User.findByAccountId(account._id, function (err, user) {
            if(!err) return cb(null, user);
            // find company with this accountId
            Company.findOne(account._id, function (err, company) {
                if(!err) return cb(null, company);
                return next(noAccountError);
            });
        });
    });
};

module.exports = mongoose.model('Account', accountSchema);