'use strict';

/* jasmine specs for controllers go here */

describe('MessageInputController', function() {
    var scope, ctrl, socket;
    
    beforeEach(module('chatterBox'));

    beforeEach(inject(function($rootScope, $controller) {
        /* global io */
        socket = io.connect();
        // get scope
        scope = $rootScope.$new();
        // instantiate controller with injected dependencies
        ctrl = $controller('MessageInputController', {$scope: scope, socket: socket});
    }));

    describe('send message', function() {

        it('should emit an event', function () {
            scope.user = 1;
            scope.msg = 'Hello World!';
            scope.messages = [];

            // define jasmine spy
            var spy = jasmine.createSpy();

            // set up spy listener
            // spy should be called on below defined event
            socket.on('message:send', spy);
<<<<<<< HEAD
            scope.sendMsg();

            expect(spy).toHaveBeenCalledWith({
=======

            // calling method that is supposed to emit spied event
            scope.sendMsg();

            // if successful our spy will have been called as defined below
            expect(spy).toHaveBeenCalledWith(jasmine.objectContaining({
>>>>>>> 1712500e1ab8006f099d56fdcae7f7f1e8aacb37
                id: 1,
                msg: 'Hello World!',
                user: 'user-' + 1
            }));
        });

    });
});
