'use strict';

chatterBox.controller('MessageListController', ['$scope', 'socket', function($scope, socket) {
    socket.on('message:send', function(data) {
        $scope.messages.push(data);
    });

    $scope.title = 'chatterBox';
    $scope.messages = [{
        msg: 'Hey Vasquez, have you ever been mistaken for a man?',
        user: 'hudson',
        time: '1 minute ago'
    }, {
        msg: 'No. Have you?',
        user: 'vasquez',
        time: 'just now'
    }];
    
    socket.on('init', function (data) {
        console.info(data);
    });
}]);
