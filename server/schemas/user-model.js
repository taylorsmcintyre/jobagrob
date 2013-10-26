var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    extend = require('mongoose-schema-extend'),
    accountSharedSchema = require('./account-shared-schema');

var userSchema = accountSharedSchema.extend({
    firstName: {
        type: String,
        required: true,
        maxLength: 40,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 60,
        trim: true
    }
});

module.exports = mongoose.model('User', userSchema);