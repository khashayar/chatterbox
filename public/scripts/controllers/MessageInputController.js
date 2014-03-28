'use strict';

chatterBox.controller('MessageInputController', ['$scope', 'socket', function($scope, socket) {
    $scope.sendMsg = function() {
        var myData = {
            user: 'user-'+$scope.user,
            msg: $scope.msg,
            id: $scope.user,
            time: Date.now()
        };
        $scope.messages.push(myData);
        socket.emit('message:send', myData);
        $scope.msg = '';
    };
}]);
