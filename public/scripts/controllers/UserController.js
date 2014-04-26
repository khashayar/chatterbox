'use strict';

chatterBox.controller('UserController', ['$scope', 'socket', function($scope, socket) {
    $scope.chambers = [];

    // Initialize user
    socket.on('user:init', function (data) {
        $scope.user = data.user;
    });

    // React to a chamber created by server
    socket.on('chamber:join', function (chamber) {
        console.log('Chamber join request');
        var exist = false;

        for (var i = 0; i < $scope.chambers.length; ++i) {
            if (chamber.id === $scope.chambers[i].id) {
                exist = true;
                break;
            }
        }

        $scope.current = chamber.id;

        if (!exist) {
            $scope.chambers.push(chamber);
        }
    });

}]);
