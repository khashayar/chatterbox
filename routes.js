'use strict';

var routes = require('./routes/index');
// var auth = require('./routes/auth');

module.exports = function(app, io, passport) {
    app.get('/', routes.index);
    app.get('/profile', isLoggedIn, routes.profile);

    // Google Authentication
    app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
    app.get('/auth/google/callback', passport.authenticate('google', {successRedirect: '/profile', failureRedirect: '/'}));

    // Facebook Authentication
    app.get('/auth/facebook', passport.authenticate('facebook'));

    // It should be the last route
    app.get('*', routes.index);

    // Socket.io Communication
    io.sockets.on('connection', require('./routes/socket'));
};

// route middleware to make sure a user is logged in
/*jshint latedef: false */
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');
}