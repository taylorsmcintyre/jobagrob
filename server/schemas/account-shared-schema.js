var ObjectID = require('mongodb').ObjectID,
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    Account = require('./account-model');

var accountSharedSchema = new Schema({
    _accountId: {
        type: Schema.ObjectId,
        required: true
    }
});

accountSharedSchema.statics.findByAccountId = function (id, cb) {
    this.findOne({_accountId: id}, function (err, account) {
        if(err) return next(err);
        cb(null, account);
    });
}

/* these are methods avaliable on both user and company models and has access to the user/company properties */
accountSharedSchema.methods.getFirstName = function (cb) {
    cb(null, this.firstName);
}


module.exports = accountSharedSchema;
