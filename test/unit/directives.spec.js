'use strict';

/* jasmine specs for controllers go here */

describe('cboxAuth-directive', function(){
    var scope, elementA, elementB;

    beforeEach(module('chatterBox'));

    beforeEach(inject(function($rootScope, $compile) {
        // get scope
        scope = $rootScope.$new();

        // create target element
        elementA = angular.element('<cbox-auth data="google"></cbox-auth>');
        elementB = angular.element('<cbox-auth data="facebook"></cbox-auth>');

        // compile target element | compile takes scope as an argument
        $compile(elementA)(scope);
        $compile(elementB)(scope);
    }));

    describe('cbox-auth', function() {
        it('should add a class according to its data attr', function () {
            expect(elementA.hasClass('googleAuth')).toBe(true);
            expect(elementB.hasClass('facebookAuth')).toBe(true);
        });

        it('should have correct content', function () {
            expect(elementA.html() && elementB.html()).toBe('Connect');
        });
    });
});
