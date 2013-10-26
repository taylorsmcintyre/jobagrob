var mongoose = require('mongoose');
var SchemaString = mongoose.SchemaTypes.String;

SchemaString.prototype.minLength = function (minLength, message) {

  var msg = message || 'Minimum length not met.';

  function testMinLength (v) {
  	return v.length >= minLength
  }

  this.validators.push([testMinLength, msg, 'minLength']);
  return this;
};


SchemaString.prototype.maxLength = function (maxLength, message) {

  var msg = message || 'Maximum length exceeded.';

  function testMaxLength (v) {
  	return v.length <= maxLength
  }

  this.validators.push([testMaxLength, msg, 'maxLength']);
  return this;
};