var routes = require('./routes/index');
var folder = require('./routes/folder');

module.exports = function(app, io) {
	app.get('/', routes.index);
	app.get('/folder', folder.list);

    // Socket.io Communication
    io.sockets.on('connection', require('./routes/socket'));
}