'use strict';

var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var credentials = require('./credentials');

module.exports = function(passport) {

    // serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // deserialize the user
    passport.deserializeUser(function(id, done) {

    });

    // Google
    passport.use(new GoogleStrategy({

        clientID: credentials.google.clientID,
        callbackURL: credentials.google.callbackURL,
        clientSecret: credentials.google.clientSecret

    }, function(accessToken, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {
            
        });

    }));

    // Facebook
    passport.use(new FacebookStrategy({

        clientID: credentials.facebook.clientID,
        callbackURL: credentials.facebook.callbackURL,
        clientSecret: credentials.facebook.clientSecret

    }, function(accessToken, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

        });

    }));
};