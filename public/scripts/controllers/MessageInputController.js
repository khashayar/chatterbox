'use strict';

chatterBox.controller('MessageInputController', ['$scope', 'socket', function($scope, socket) {
    $scope.sendMsg = function() {
        socket.emit('message:send', {
            content: $scope.msg,
            chamber: $scope.chamber
        });

        $scope.messages.push({
            time: Date.now(),
            user: $scope.user,
            content: $scope.msg
        });

        delete $scope.msg;
    };
}]);
