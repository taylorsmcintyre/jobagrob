var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10,
    accountSchema = require('./account-abstract-model');


var companySchema = accountSchema.extend({
    companyName: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Company', companySchema);
