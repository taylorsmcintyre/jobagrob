/* 
install Brew to install Node and Mongo
then run: node mongo-restify.js - to compile the js file and execute this script that starts a web server
then run: mongod to start the mongo database
*/

/* Creation of Server */
var restify = require('restify');

//var db = require('mongojs').connect('localhost:27017/whippextest01', ['devices']);

var server = restify.createServer();

/* Server Setup */
server.use(
  function crossOrigin(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 'Content-Type, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    return next();
  }
);

server.on('MethodNotAllowed', function unknownMethodHandler(req, res) {
  if (req.method.toLowerCase() === 'options') {
    var allowHeaders = ['Accept', 'Accept-Version', 'Content-Type', 'Api-Version', 'Origin', 'X-Requested-With']; // added Origin & X-Requested-With
    if (res.methods.indexOf('OPTIONS') === -1) res.methods.push('OPTIONS');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', allowHeaders.join(', '));
    res.header('Access-Control-Allow-Methods', res.methods.join(', '));
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    return res.send(204);
  }
  else
    return res.send(new restify.MethodNotAllowedError());
});


/* REST Application Interface */

// requested url via get
server.get('/api/signup/validate', function(req, res, next) {
	res.send({
		status: 'ok',
	});
});
/*
server.get('/hello/:name', function(req, res, next) {
	res.send([{
		name: 'taylor',
		age: req.params.name
	}]);
});
*/


server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
