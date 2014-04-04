'use strict';

var cbox = global.$cbox;

var uid = 0;

module.exports = function (socket) {
    var user = socket.handshake.user;

    // Prepare required fields for client
    var info = {
        timestamp: Date.now(),
        user: {
            id: user._id,
            name: user.google.given_name,
            email: user.google.email,
            picture: user.google.picture
        }
    };

    // Send new user their username
    socket.emit('init', info);

    // socket.broadcast('user:join', {});

    socket.on('message:send', function(data) {
        socket.broadcast.emit('message:send', data);
    });

    socket.on('disconnect', function (data) {
        console.log('>>>> user disconnected: ', data);
        // Clean up stuff
    });
};
