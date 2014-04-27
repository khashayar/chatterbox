'use strict';

/* jasmine specs for controllers go here */

describe('MessageListController', function(){
    var scope, ctrl, socket;

    beforeEach(module('chatterBox'));

    beforeEach(inject(function($rootScope, $controller) {
        /* global io */
        socket = io.connect();

        // get scope
        scope = $rootScope.$new();

        // Initialize the scope with injected properties
        scope.chamber = {
            id: 123456,
            participants: [789]
        };

        // instantiate controller with the injected dependencies
        ctrl = $controller('MessageListController', {$scope: scope, socket: socket});
    }));

    describe('receive message', function() {
        it('should push the message to messages list', function () {
            // fake emitted message from server with below payload
            socket.emit('message:send', {
                id: 98765,
                user: {},
                chamber: 123456,
                content: 'Hallo Welt!'
            });

            // client messages array should now include emitted message
            expect(scope.messages[0]).toEqual(jasmine.objectContaining({
                id: 98765,
                user: {},
                chamber: 123456,
                content: 'Hallo Welt!'
            }));
        });
    });

    describe('receive message', function() {
        it('should not push the message to messages list for not a valid chamber', function () {
            // fake emitted message from server
            socket.emit('message:send', {
                id: 98765,
                user: {},
                chamber: 11111,
                content: 'Hallo Welt!'
            });

            // Messages array should be empty
            expect(scope.messages.length).toEqual(0);
        });
    });
});
