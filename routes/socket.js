'use strict';

var cbox = global.$cbox;

var ObjectID = require('mongodb').ObjectID;

module.exports = function (socket) {
    var io = cbox.io;
    var user = socket.handshake.user;

    // Prepare required fields for client
    var field = user.google || user.facebook;
    var clientUserObject = {
        id: user._id,
        displayName: user.displayName,
        email: field.email,
        picture: field.picture
    };

    // Send new user their username
    socket.emit('user:init', {user: clientUserObject});

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Contact List
    socket.on('contacts:list', function(data, callback) {
        var users = cbox.db.collection('users');

        users.findOne({ '_id': user._id }, { contacts: 1 }, function(err, result) {
            if (err) { throw err; }

            users.find({ '_id' : { $in: result.contacts } }).toArray(function(err, contacts) {
                if (err) { throw err; }

                contacts = (contacts || []).map(function(c) {
                    return {
                        id: c._id,
                        displayName: c.displayName
                    };
                });

                callback({contacts: contacts});
            });
        });
    });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Chamber Create
    socket.on('chamber:create', function(data, callback) {
        var chambers = cbox.db.collection('chambers');
        
        var participants = data.participants.map(function(id) {
            return ObjectID.createFromHexString(id);
        });

        participants.unshift(user._id);
        data.participants.unshift(user._id.toHexString());

        // Using this method over update, since update doesn't
        // return the id of created item in callback.
        chambers.findAndModify({
            participants: {
                $all: participants,
                $size: participants.length
            }
        }, null, { participants: participants }, { upsert: true, new: true }, function(err, result) {
            if (err) { throw err; }
            
            var chamber = {
                id: result._id,
                participants: result.participants
            };

            // Get the list of all connected users
            var clients = io.sockets.clients();

            clients.forEach(function(client) {
                console.log('### Client check: ', client.handshake.user.google.email, 'with id: ', client.handshake.user._id);
                // Current user is connected and a participant of current chamber?
                if (data.participants.indexOf(client.handshake.user._id.toHexString()) !== -1) {
                    console.log('+++ User joined: ', client.handshake.user.google.email, ' to chamber: ', chamber.id);
                    client.join(chamber.id);
                }
            });

            // At this point, only let the current user, who asked to prepare a new
            // chamber, know about the created chamber, other participants will be
            // informed as soon as a message is sent in this chamber.
            socket.emit('chamber:join', chamber);
        });
    });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Message Send
    socket.on('message:send', function(data) {
        // TODO: [Security] Check whether current user is participant of this chamber,
        // otherwise users can post to other chambers that they're no member of!
        console.log('--- Broadcast to chamber: ', data.chamber.id);

        // In case of this is the first message in this chamber, let the other
        // participants know about 
        socket.broadcast.to(data.chamber.id).emit('chamber:join', data.chamber);

        // Note: Broadcasting 'chamber:join' and then immediately after that 'message:send'
        // results an rendering glitch on client-side for the first message in a chamber.
        // It seems that the creation of chamber is not done yet and rendering of first message
        // would be missed by the controller. To overcome this issue I put the second broadcast
        // inside the nextTick, but not sure if it's a performant way since handing over the
        // messages should be instantly in order to prevent the delays in chats.
        process.nextTick(function() {
            var messages = cbox.db.collection('messages');

            // Save the message in db
            messages.insert({
                sent: new Date(),
                author: user._id,
                content: data.content,
                chamber: ObjectID.createFromHexString(data.chamber.id)
            }, {w:1}, function(err, result) {
                if (err) { throw err; }

                // Now notify others
                socket.broadcast.to(data.chamber.id).emit('message:send', {
                    id: result[0]._id.toHexString(),
                    time: result[0].sent,
                    user: clientUserObject,
                    content: data.content,
                    chamber: data.chamber.id
                });
            });
        });
    });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // User Leaves
    socket.on('disconnect', function (data) {
        console.log('>>>> user disconnected: ', data);
    });
};
