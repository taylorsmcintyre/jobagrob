jobagrob.factory('signUpValidate', ($resource) ->
	# return $resource('api/signup/validate')
	return $resource('http://localhost:port/api/signup/validate', {port: ':8080'});

)