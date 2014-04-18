'use strict';

chatterBox.directive('cbChatChamber', function() {
    return {
        restrict: 'C',
        scope: {
            chamber: '='
        },
        templateUrl: '/templates/directives/chat-box.html',
        controller: 'MessageListController'
    };
});