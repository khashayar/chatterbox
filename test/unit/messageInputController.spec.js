'use strict';

/* jasmine specs for controllers go here */

describe('MessageInputController', function() {
    var scope, ctrl, socket;
    
    beforeEach(module('chatterBox'));

    beforeEach(inject(function($rootScope, $controller) {
        /* global io */
        socket = io.connect();

        // Get scope
        scope = $rootScope.$new();

        // Initialize the scope with injected properties
        scope.messages = [];
        scope.chamber = {
            id: 123,
            participants: [456]
        };

        // Instantiate controller with injected dependencies
        ctrl = $controller('MessageInputController', {$scope: scope, socket: socket});
    }));

    describe('send message', function() {

        it('should emit an event', function () {
            scope.msg = 'Hallo Welt!';

            // Define jasmine spy
            var spy = jasmine.createSpy();

            // Set up spy listener
            // Spy should be called on below defined event
            socket.on('message:send', spy);

            // Calling method that is supposed to emit spied event
            scope.sendMsg();

            // If successful our spy will have been called as defined below
            expect(spy).toHaveBeenCalledWith(jasmine.objectContaining({
                content: 'Hallo Welt!',
                chamber: {
                    id: 123,
                    participants: [456]
                }
            }));
        });

        it('should push the message to messages list', function() {
            scope.msg = 'Die erste Nachricht';
            scope.sendMsg();

            scope.msg = 'Die zweite Nachricht';
            scope.sendMsg();

            expect(scope.messages.length).toEqual(2);
        });

        it('should reset the msg property after sending a message', function() {
            scope.msg = 'Guten Morgen!';
            scope.sendMsg();

            expect(scope.msg).toBe(undefined);
        });

    });
});
