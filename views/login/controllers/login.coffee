jobagrob.controller('Login', ($scope, signup) ->
	console.log 'Login View'

	#$scope.valid = validator.query();

	$scope.signupValidate = signup.get();



	$scope.signUp = (user) ->
		signup.save user;

)