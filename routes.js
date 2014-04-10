'use strict';

var routes = require('./routes/index');
var imports = require('./routes/import');
// var auth = require('./routes/auth');

module.exports = function(app, io, passport) {
    app.get('/', routes.index);
    app.get('/import/google', isSecure, imports.google);

    // Google Authentication
    app.get('/auth/google', passport.authenticate('google'));
    app.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/import/google', failureRedirect: '/failed' }));

    // Facebook Authentication
    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/profile', failureRedirect: '/' }));

    // It should be the last route
    app.get('*', routes.index);

    // Socket.io Communication
    io.sockets.on('connection', require('./routes/socket'));
};

// route middleware to make sure a user is logged in
/*jshint latedef: false */
function isSecure(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');
}
