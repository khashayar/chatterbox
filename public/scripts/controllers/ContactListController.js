'use strict';

chatterBox.controller('ContactListController', ['$scope', 'socket', function($scope, socket) {
    $scope.sortorder = 'activeSession';

    socket.emit('contacts:list', {}, function(data) {
        $scope.contacts = data.contacts;
    });

    $scope.startChat = function(contact) {
        contact[$scope.sortorder] = true;
        $scope.selected = contact.id;

        // Ask server to prepare a chamber for current participants
        socket.emit('chamber:create', {
            participants: [contact.id]
        });
    };

}]);
