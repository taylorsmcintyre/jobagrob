jobagrob.controller('SignUp', ($scope, signUp) ->
	console.log 'Sign Up'

	#$scope.valid = validator.query();
	$scope.template = 'signup'

	$scope.signUp = (user) ->
		signUp.save user;
)

jobagrob.controller('LogIn', ($scope, logIn) ->
	console.log 'Log In'

	$scope.template = 'login'

	$scope.logIn = (credentials) ->
		logIn.get credentials

)