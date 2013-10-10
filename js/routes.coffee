window.jobagrob = angular.module('jobagrob', ['ngResource']).config(($routeProvider) ->
  $routeProvider.when('/signup',
    templateUrl: 'views/credentials/partials/credentials.html'
    controller: 'SignUp'
  ).when('/login',
    templateUrl: 'views/credentials/partials/credentials.html'
    controller: 'LogIn'
  ).when('/generator',
  	templateUrl: 'views/generator/partials/generator.html',
  	controller: 'Generator'
  ).otherwise
    templateUrl: 'views/main/partials/main.html'
    controller: 'Main'
)