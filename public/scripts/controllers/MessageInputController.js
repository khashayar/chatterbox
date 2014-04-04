'use strict';

chatterBox.controller('MessageInputController', ['$scope', 'socket', function($scope, socket) {
    $scope.sendMsg = function() {
        var data = {
            time: Date.now(),
            user: $scope.user,
            content: $scope.msg
        };

        socket.emit('message:send', data);
        $scope.messages.push(data);
        delete $scope.msg;
    };
}]);
