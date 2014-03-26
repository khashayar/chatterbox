'use strict';

chatterBox.controller('MsgController', ['$scope', 'Messages', 'socket', function($scope, Messages, socket) {
    $scope.title = "chatterBox";
    $scope.messages = [{msg: "Hey Vasquez, have you ever been mistaken for a man?", user: "hudson", time: "1 minute ago"}, {msg: "No. Have you?", user: "vasquez", time: "just now"}];
    
    socket.emit('init', {time: Date.now()});
    //Messages.getList().then(function(data) {
        //$scope.messages = [data];
    //});
}]);
