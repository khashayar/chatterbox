'use strict';

chatterBox.controller('ContactListController', ['$scope', 'socket', function($scope, socket) {

    socket.emit('contacts:list', {}, function(data) {
        $scope.contacts = data.contacts;
    });

    $scope.startChat = function(contact) {
        // TODO: Show an invitation message
        if (!contact.connected) {
            window.alert(contact.displayName + ' is not connected to ChatterBox yet.');
            return;
        }

        contact.activeSession = true;
        $scope.selected = contact.id;

        // Ask server to prepare a chamber for current participants
        socket.emit('chamber:create', {
            participants: [contact.id]
        });
    };

}]);
