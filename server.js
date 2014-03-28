'use strict';

/**
 * Module dependencies.
 */

var express = require('express');

var app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

var routes = require('./routes')(app, io),
	path = require('path');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
    app.use(express.errorHandler());
}

// Server
server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port') + ' running on ' + app.get('env') + ' env.');
});
