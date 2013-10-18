var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    extend = require('mongoose-schema-extend'),
    accountSharedSchema = require('./account-shared-schema');

var companySchema = accountSharedSchema.extend({
    name: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Company', companySchema);
