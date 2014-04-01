'use strict';

chatterBox.controller('MessageListController', ['$scope', 'socket', function($scope, socket) {
    $scope.title = 'Chatter Box';
    $scope.messages = [];

    $scope.add = function(a, b) {
        return a+b;
    };

    socket.on('message:send', function(data) {
        $scope.messages.push(data);
    });
}]);
