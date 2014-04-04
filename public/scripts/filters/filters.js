'use strict';

chatterBox.filter('isMe', function() {
    return function(input, user) {
        return (input.id === user.id) ? 'isMe' : '';
    };
});
