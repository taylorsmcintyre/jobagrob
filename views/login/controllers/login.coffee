jobagrob.controller('Login', ($scope, signUpValidate) ->
	console.log 'Login View'

	$scope.v = signUpValidate.query();

)