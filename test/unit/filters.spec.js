'use strict';

describe('filter', function() {

    beforeEach(module('chatterBox'));

    describe('isMe', function() {
        // notice how we inject out filter and assign a specific one to a variable 
        it('should return "isMe" when user and input match', inject(function($filter) {
            var isMeFilter = $filter('isMe');
            expect(isMeFilter({id: 'aaa'},{id: 'aaa'})).toEqual('isMe');
            expect(isMeFilter({id: 'aaa'},{id: 'bbb'})).toEqual('');
        }));
    });
});
