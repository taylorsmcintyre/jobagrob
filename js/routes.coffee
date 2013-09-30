window.jobagrob = angular.module('jobagrob', []).config(($routeProvider) ->
  $routeProvider.when('/login',
    templateUrl: 'views/login/partials/login.html'
    controller: 'Login'
  ).when('/generator',
  	templateUrl: 'views/generator/partials/generator.html',
  	controller: 'Generator'
  ).otherwise
    templateUrl: 'views/main/partials/main.html'
    controller: 'Main'
)