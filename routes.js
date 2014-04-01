'use strict';

var routes = require('./routes/index');

module.exports = function(app, io) {
	app.get('/', routes.index);

    // Socket.io Communication
    io.sockets.on('connection', require('./routes/socket'));
};
