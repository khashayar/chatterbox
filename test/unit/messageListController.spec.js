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
        // instantiate controller with the injected dependencies
        ctrl = $controller('MessageListController', {$scope: scope, socket: socket});
    }));

    describe('set user', function() {
        it('should set user correctly on init emit', function () {
            // fake our server init event, with fake user '3'
            socket.emit('init', {user: {id: 3}});
            // user variable on client side should show user '3'
            expect(scope.user.id).toEqual(3);
        });
    });

    describe('get messages', function() {
        it('should append message array on emitted message', function () {
            // fake emitted message from server with below payload
            socket.emit('message:send', {user: 'user-1', msg: 'Hello World!', id: 1});

            // client messages array should now include emitted message
            expect(scope.messages[0]).toEqual(jasmine.objectContaining({
                user: 'user-1',
                msg: 'Hello World!',
                id: 1
            }));
        });
    });

    describe('get chatParticipants', function() {
        it('should set correct amount of participants', function () {
            socket.emit('chatParticipants', [{user: 'user-1', id: 1}, {user: 'user-2', id: 2}]);

            expect(scope.chatParticipants[0]).toEqual(jasmine.objectContaining({
                user: 'user-1',
                id: 1
            }));

            expect(scope.chatParticipants.length).toEqual(2);
        });
    });
});
