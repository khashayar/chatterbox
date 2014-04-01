'use strict';

var routes = require('./routes/index');

module.exports = function(app, io, passport) {
    app.get('/', routes.index);

	app.get('/auth/google', passport.authenticate('google'));
    app.get('/auth/facebook', passport.authenticate('facebook'));

    // Socket.io Communication
    io.sockets.on('connection', require('./routes/socket'));
};
