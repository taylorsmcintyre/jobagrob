jobagrob.factory('signup', ($resource) ->
	# return $resource('api/signup/validate')
	return $resource('http://localhost:port/api/signup', {port: ':8080'});

)