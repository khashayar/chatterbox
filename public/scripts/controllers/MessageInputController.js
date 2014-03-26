'use strict';

chatterBox.controller('MessageInputController', ['$scope', 'socket', function($scope, socket) {
    socket.on('init', function(data) {
        $scope.user = data.id;
    })

    $scope.sendMsg = function() {
        var myData = {user: "user-"+$scope.user, msg: $scope.msg, id: $scope.user }; 
        $scope.messages.push(myData);
        socket.emit('message:send', myData);
        $scope.msg = "";
    }
}]);
