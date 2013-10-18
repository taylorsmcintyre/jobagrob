jobagrob.factory('signUp', ($resource) ->
	$resource 'http://localhost:port/api/signup', port: ':8080'
)

.factory('logIn', ($resource) ->
	$resource 'http://localhost:port/api/login', port: ':8080'
)

.factory('checkLogIn', ($resource) ->
	$resource 'http://localhost:port/api/checklogin', port: ':8080'
)