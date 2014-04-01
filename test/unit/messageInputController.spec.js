'use strict';

/* jasmine specs for controllers go here */

describe('MessageInputController', function() {
    var scope, ctrl, socket;
    
    beforeEach(module('chatterBox'));

    beforeEach(inject(function($rootScope, $controller) {
        /* global io */
        socket = io.connect();
        scope = $rootScope.$new();
        ctrl = $controller('MessageInputController', {$scope: scope, socket: socket});
    }));

    describe('send message', function() {

        it('should emit an event', function () {
            scope.user = 1;
            scope.msg = 'Hello World!';
            scope.messages = [];

            var spy = jasmine.createSpy();

            socket.on('message:send', spy);
            scope.sendMsg();

            expect(spy).toHaveBeenCalledWith({
                id: 1,
                msg: 'Hello World!',
                user: 'user-' + 1,
            });
        });

    });
});