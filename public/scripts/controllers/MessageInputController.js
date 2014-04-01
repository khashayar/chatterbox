'use strict';

chatterBox.controller('MessageInputController', ['$scope', 'socket', function($scope, socket) {
    socket.on('init', function(data) {
        $scope.user = data.id;
    });

    $scope.sendMsg = function() {
        var data = {
            id: $scope.user,
            msg: $scope.msg,
            user: 'user-' + $scope.user,
        };

        socket.emit('message:send', data);
        $scope.messages.push(data);
        delete $scope.msg;
    };
}]);
