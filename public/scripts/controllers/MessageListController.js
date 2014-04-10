'use strict';

chatterBox.controller('MessageListController', ['$scope', 'socket', function($scope, socket) {
    $scope.title = 'Chatter Box';
    $scope.messages = [];

    socket.on('init', function (data) {
        $scope.user = data.user;
    });

    socket.on('chatParticipants', function (data) {
        $scope.chatParticipants = data;
    });

    socket.on('message:send', function(data) {
        $scope.messages.push(data);
    });
}]);
