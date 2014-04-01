'use strict';

/**
 * Module dependencies.
 */

var express = require('express');

var app = express();
var passport = require('passport');

// Socket.io
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

// Routes
var routes = require('./routes')(app, io, passport);
var path = require('path');

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

// Required for Passport
require('./config/auth/passport')(passport);
app.use(express.cookieParser());
app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' }));
app.use(passport.initialize());
app.use(passport.session());

// development only
if ('development' === app.get('env')) {
    app.use(express.errorHandler());
}

// Server
server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port') + ' running on ' + app.get('env') + ' env.');
});
