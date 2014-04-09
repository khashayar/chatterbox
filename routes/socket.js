'use strict';

var cbox = global.$cbox;

var uid = 0;

module.exports = function (socket) {
    var user = socket.handshake.user;

    socket.user = user;
    socket.join('room');
    var clients = this.clients('room');
    var connectedUsers = [];

    clients.forEach(function(client) {
        connectedUsers.push(client.user);
    });


    // Prepare required fields for client
    var info = { timestamp: Date.now() };
    if (user.google) {
        info.user = {
            id: user._id,
            name: user.google.given_name,
            email: user.google.email,
            picture: user.google.picture
        };
    } else {
        info.user = {
            id: user._id,
            name: user.facebook.name,
            email: user.facebook.email,
            picture: user.facebook.picture.data.url
        };
    }

    // Send new user their username
    socket.emit('init', info);

    socket.emit('chatParticipants', connectedUsers);
    socket.broadcast.emit('chatParticipants', connectedUsers);

    socket.on('message:send', function(data) {
        socket.broadcast.emit('message:send', data);
    });

    socket.on('disconnect', function (data) {
        console.log('>>>> user disconnected: ', data);
        // Clean up stuff
    });
};
