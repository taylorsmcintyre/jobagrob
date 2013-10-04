jobagrob.controller('Login', ($scope, signup) ->
	console.log 'Login View'

	#$scope.valid = validator.query();

	$scope.signUp = (user) ->
		signup.save user;

)