// Generated by CoffeeScript 1.6.3
(function() {
  jobagrob.factory('signUpValidate', function($resource) {
    return $resource('http://localhost:port/api/signup/validate', {
      port: ':8080'
    });
  });

}).call(this);
