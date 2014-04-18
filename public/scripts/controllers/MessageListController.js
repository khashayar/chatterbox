'use strict';

chatterBox.controller('MessageListController', ['$scope', 'socket', function($scope, socket) {
    $scope.messages = [];

    socket.on('message:send', function(data) {
        console.log('Message recieved: ', data);

        // Not a message for this chamber, ignore it
        if ($scope.chamber.id !== data.chamber) {
            return;
        }

        $scope.messages.push(data);
    });
}]);
