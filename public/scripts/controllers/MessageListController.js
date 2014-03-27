'use strict';

chatterBox.controller('MessageListController', ['$scope', 'socket', function($scope, socket) {

    $scope.add = function(a, b) {
        return a+b;
    }

    socket.on('message:send', function(data) {
        $scope.messages.push(data);
    })

    $scope.title = "chatterBox";
    $scope.messages = [];
    socket.on('init', function (data) {
        console.info(data);
    });
}]);
