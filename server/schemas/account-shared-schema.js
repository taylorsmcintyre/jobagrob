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

accountSharedSchema.methods.findById = function (id, cb) {
	var _this = this;
    Account.findById(id, function (err, account) {
	  _this.findOne({_accountId: account._id}, function (err, u) {
	    cb(err, u);
	  });
    });
};

module.exports = accountSharedSchema;
