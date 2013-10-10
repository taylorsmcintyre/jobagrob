// Generated by CoffeeScript 1.6.3
(function() {
  window.jobagrob = angular.module('jobagrob', ['ngResource']).config(function($routeProvider) {
    return $routeProvider.when('/signup', {
      templateUrl: 'views/credentials/partials/credentials.html',
      controller: 'SignUp'
    }).when('/login', {
      templateUrl: 'views/credentials/partials/credentials.html',
      controller: 'LogIn'
    }).when('/generator', {
      templateUrl: 'views/generator/partials/generator.html',
      controller: 'Generator'
    }).otherwise({
      templateUrl: 'views/main/partials/main.html',
      controller: 'Main'
    });
  });

}).call(this);
