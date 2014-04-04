'use strict';

chatterBox.controller('MessageListController', ['$scope', 'socket', function($scope, socket) {
    $scope.title = 'Chatter Box';
    $scope.messages = [];
    $scope.user = null;

    socket.on('init', function (data) {
        $scope.user = data.user;
    });

    socket.on('message:send', function(data) {
        console.log('message: ', data);
        $scope.messages.push(data);
    });
}]);
