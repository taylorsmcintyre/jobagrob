var ObjectID = require('mongodb').ObjectID,
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');

var accountSharedSchema = new Schema({
    _accountId: {
        type: Schema.ObjectId,
        required: true
    }
});

module.exports = accountSharedSchema;
