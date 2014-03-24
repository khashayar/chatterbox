'use strict';

chatterBox.controller('MsgController', ['$scope', 'Messages', function($scope, Messages) {
    $scope.messages = [];

    Messages.getList().then(function(data) {
        $scope.messages = [data];
    });
}]);
