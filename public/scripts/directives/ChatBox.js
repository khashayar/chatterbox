'use strict';

chatterBox.directive('cbChatBox', function() {
    return {
        restrict: 'C',
        scope: {
            user: '='
        },
        templateUrl: '/templates/directives/chat-box.html'
    };
});