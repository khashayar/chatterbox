'use strict';

chatterBox.filter('isMe', function() {
    return function(input, user) {
        return (+input.slice(5) === user) ? 'isMe' : '';
    };
});
