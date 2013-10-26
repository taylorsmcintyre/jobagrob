var ObjectID = require('mongodb').ObjectID,
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var jobSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 150
    },
    shortDescription: {
        type: String,
        trim: true,
        required: true,
        minLength: 10,
        maxLength: 300
    },
    longDescription: {
        type: String,
        trim: true,
        maxLength: 1000
    },
    type: {
        type: Schema.ObjectId,
        required: true
    },
    industry: {
        type: Schema.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('Job', jobSchema);