'use strict';

chatterBox.controller('MessageInputController', ['$scope', 'socket', function($scope, socket) {
    $scope.sendMsg = function() {
        var data = {
            id: $scope.user,
            msg: $scope.msg,
            time: Date.now(),
            user: 'user-' + $scope.user,
        };

        socket.emit('message:send', data);
        $scope.messages.push(data);
        delete $scope.msg;
    };
}]);
