'use strict';

chatterBox.controller('MsgController', ['$scope', 'Messages', function($scope, Messages) {
    $scope.title = "chatterBox";
    $scope.messages = [{msg: "test message"}];

    //Messages.getList().then(function(data) {
        //$scope.messages = [data];
    //});
}]);
