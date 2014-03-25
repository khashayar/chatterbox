'use strict';

chatterBox.controller('MsgController', ['$scope', 'Messages', 'socket', function($scope, Messages, socket) {
    $scope.title = "chatterBox";
    $scope.messages = [{msg: "test message"}];
    
    socket.emit('init', {time: Date.now()});
    //Messages.getList().then(function(data) {
        //$scope.messages = [data];
    //});
}]);
