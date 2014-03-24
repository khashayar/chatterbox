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

    describe('MsgController', function() {
        var scope, ctrl, $httpBackend;

        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('/test').
                respond({id: "1", userGet: "vasquez", userPost: "hudson", msg: "Hey Vasquez, have you ever been mistaken for a man?" });

            scope = $rootScope.$new();
            ctrl = $controller('MsgController', {$scope: scope});
        }));

        it('should create "messages" model with 1 message', function() {
            expect(scope.messages).toEqual([]);
            $httpBackend.flush();

            expect(scope.messages).toEqualData(
            [{id: "1", userGet: "vasquez", userPost: "hudson", msg: "Hey Vasquez, have you ever been mistaken for a man?" }]);
        });
    });
});
