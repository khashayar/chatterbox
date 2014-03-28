'use strict';

/* jasmine specs for controllers go here */

describe('chatterBox controllers', function(){

    beforeEach(function(){
        this.addMatchers({
            toEqualData: function(expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    beforeEach(module('chatterBox'));

    describe('MessageListController', function() {
        var scope, ctrl, socket;

        beforeEach(inject(function($rootScope, $controller, _socket_) {
            socket = _socket_;

            scope = $rootScope.$new();

            ctrl = $controller('MessageListController', {$scope: scope, socket: socket});
        }));

        it('should create "messages" model with 1 message', function() {
            expect(scope.messages).toEqual([]);

            expect(scope.messages).toEqualData([]);
        });

        it('should calculate the sum with add function', function() {
            expect(scope.add(1,2)).toEqual(3);
        });

    });
});
