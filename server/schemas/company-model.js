var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    extend = require('mongoose-schema-extend'),
    accountSharedSchema = require('./account-shared-schema');

require('../plugins/validation-augments.js');

var companySchema = accountSharedSchema.extend({
    name: {
        type: String,
        required: true,
        maxLength: 50,
        trim: true
    }
});

module.exports = mongoose.model('Company', companySchema);
