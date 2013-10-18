var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    extend = require('mongoose-schema-extend'),
    accountSharedSchema = require('./account-shared-schema');

var userSchema = accountSharedSchema.extend({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('User', userSchema);
