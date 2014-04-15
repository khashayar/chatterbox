'use strict';

chatterBox.controller('ContactListController', ['$scope', 'socket', function($scope, socket) {
    $scope.sortorder = 'activeSession';

    socket.emit('contacts:list', {}, function(data) {
        $scope.contacts = data.contacts;
    });

    $scope.startChat = function(contact) {
        $scope.chats = $scope.chats || [];

        $scope.current = contact._id;

        var idx = $scope.chats.indexOf(contact);

        if (idx === -1) {
            contact[$scope.sortorder] = true;
            $scope.chats.push(contact);
        }
    };

}]);
