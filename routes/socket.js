/*
 * Serve content over a socket
 */

var uid = 0;

module.exports = function (socket) {
    uid++;

    // Send new user their username
    socket.emit('init', {
        name: 'user-' + uid
    });

    // socket.broadcast('user:join', {});

    socket.on('disconnect', function () {
        // Clean up stuff
    });
};