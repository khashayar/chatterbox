'use strict';

/* jasmine specs for controllers go here */

describe('chatterBox controllers', function(){

    beforeEach(module('chatterBox'));

    describe('MessageListController', function() {
        var scope, ctrl, socket;

        beforeEach(inject(function($rootScope, $controller, _socket_) {
            socket = _socket_;

            scope = $rootScope.$new();

            ctrl = $controller('MessageListController', {$scope: scope, socket: socket});
        }));

    });
});
