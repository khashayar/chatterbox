'use strict';

chatterBox.controller('MessageListController', ['$scope', 'socket', function($scope, socket) {
    $scope.title = 'Chatter Box';
    $scope.messages = [];
    $scope.user = null;

    socket.on('init', function (data) {
        $scope.user = data.id;
    });

    socket.on('message:send', function(data) {
        $scope.messages.push(data);
    });
}]);
