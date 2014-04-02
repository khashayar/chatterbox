'use strict';

var params = {};
var path = require('path');
var express = require('express');
var passport = params.passport = require('passport');

// Socket.io
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server, { log: false });

// Database
var MongoClient = require('mongodb').MongoClient;
var dbconfig = require('./config/db/database-' + app.get('env') + '.js');

MongoClient.connect(dbconfig.url, function(err, db) {
    if (err) {
        throw 'Error connecting to database!';
    }

    params.db = db;
    console.log('Connected to database');
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// Passport
require('./config/auth/passport')(params);
app.use(express.cookieParser());
// app.use(express.bodyParser());
app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(app.router);
var routes = require('./routes')(app, io, passport);

// development only
if ('development' === app.get('env')) {
    app.use(express.errorHandler());
}

// Server
server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port') + ' running on ' + app.get('env') + ' env.');
});
