'use strict';

/*
 * Serve content over a socket
 */

var uid = 0;

module.exports = function (socket) {
    uid++;

    // Send new user their username
    socket.emit('init', { id: uid });

    // socket.broadcast('user:join', {});

    socket.on('message:send', function(data) {
        data.user = 'user-' + data.id;
        data.time = Date.now();

        socket.broadcast.emit('message:send', data);
    });

    socket.on('disconnect', function (data) {
        console.log('>>>> user disconnected: ', data);
        // Clean up stuff
    });
};
