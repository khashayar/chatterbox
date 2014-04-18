'use strict';

var SESSION_KEY = 'chatbox.id';
var SESSION_SECRET = 'the_awesome_chat_app';

var cbox = global.$cbox = {};

var path = require('path');
var express = require('express');
var passport = cbox.passport = require('passport');
var sessionStore = new express.session.MemoryStore();

// Socket.io
// var cookie = require('cookie');
// var connect = require('connect');

var app = cbox.app = express();
var server = require('http').createServer(app);
var io = cbox.io = require('socket.io').listen(server, { log: false });

io.configure(function() {
    io.set('authorization', function (handshakeData, accept) {
        var cookie = handshakeData.headers.cookie;

        if (!cookie) {
            return accept('Invalid session data.', false);
        }

        express.cookieParser(SESSION_SECRET)(handshakeData, {}, function(err) {
            if (err) {
                return accept('Error while parsing cookie', false);
            }

            // console.log('--- SignedCookies: ', handshakeData.signedCookies);

            // Get the associated session for this ID. If it doesn't exist, then bail.
            sessionStore.get(handshakeData.signedCookies[SESSION_KEY], function(err, session) {
                if (err) {
                    return accept('Error while retrieving session from store', false);
                }

                if (!session || !session.passport) {
                    return accept('No session found.', false);
                }

                var user = session.passport.user;

                if (!user) {
                    return accept('Invalid session.', false);
                }

                passport.deserializeUser(user, function(err, user) {
                    if (err) {
                        return accept(err, false);
                    }

                    if (!user) {
                        return accept('User not found!', false);
                    }

                    handshakeData.user = user;
                    return accept(null, true);
                });
            });
        });
    });
});

// Database
var MongoClient = require('mongodb').MongoClient;
var dbconfig = require('./config/db/database-' + app.get('env') + '.js');

MongoClient.connect(dbconfig.url, function(err, db) {
    if (err) {
        throw 'Error connecting to database!';
    }

    cbox.db = db;
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
require('./config/auth/passport')();
app.use(express.cookieParser());
app.use(express.session({ secret: SESSION_SECRET, key: SESSION_KEY, store: sessionStore }));
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
