/*
 * Serve content over a socket
 */

module.exports = function (socket) {
    socket.on('init', function (data) {
        console.log(data);
    });
};