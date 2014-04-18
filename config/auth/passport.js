'use strict';

var cbox = global.$cbox;

// Strategies
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Models
var ObjectID = require('mongodb').ObjectID;
// var User = require('../../models/user');

var credentials = require('./credentials');

module.exports = function() {
    var passport = cbox.passport;

    // serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    // deserialize the user
    passport.deserializeUser(function(id, done) {
        var users = cbox.db.collection('users');
        users.findOne({'_id': ObjectID.createFromHexString(id)}, function(err, user) {
            done(err, user);
        });
    });

    // Google
    passport.use(new GoogleStrategy({

        clientID: credentials.google.clientID,
        callbackURL: credentials.google.callbackURL,
        clientSecret: credentials.google.clientSecret,
        scope: [
            'https://www.google.com/m8/feeds',
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile'
        ]

    }, function(accessToken, refreshToken, profile, done) {
        
        // asynchronous
        process.nextTick(function() {
            var users = cbox.db.collection('users');

            // Let's check if user is already connected
            users.findOne({'google.id': profile.id}, function(err, user) {
                if (err) { return done(err); }

                var google = profile._json;
                google.token = accessToken;

                if (user) {
                    // Update user data upon new connection
                    users.update({ _id: user._id }, { google: google }, {w:0});
                    return done(null, user);
                } else {
                    var record = {
                        displayName: google.name,
                        google: google
                    };

                    users.insert(record, {w:1}, function(err, result) {
                        if (err) { throw err; }
                        return done(null, result[0]);
                    });
                }
            });
        });

    }));

    // Facebook
    passport.use(new FacebookStrategy({

        clientID: credentials.facebook.clientID,
        callbackURL: credentials.facebook.callbackURL,
        clientSecret: credentials.facebook.clientSecret,
        profileFields: ['id', 'username', 'displayName', 'name', 'gender', 'emails', 'photos', 'friends'],
        scope: ['basic_info', 'email']

    }, function(accessToken, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {
            var users = cbox.db.collection('users');
            users.findOne({'facebook.id': profile.id}, function(err, user) {
                if (err) { return done(err); }

                var facebook = profile._json;
                facebook.token = accessToken;
                facebook.picture = facebook.picture.data.url;

                if (user) {
                    return done(null, user);
                } else {
                    var record = {
                        displayName: facebook.name,
                        facebook: facebook
                    };

                    users.insert(record, {w:1}, function(err, result) {
                        if (err) { throw err; }
                        return done(null, result[0]);
                    });
                }
            });
        });
    }));
};
