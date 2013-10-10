jobagrob.factory('signUp', ($resource) ->
	# return $resource('api/signup/validate')
	return $resource('http://localhost:port/api/signup', port: ':8080')
)

.factory('logIn', ($resource) ->
	return $resource('http://localhost:port/api/login', port: ':8080')
)