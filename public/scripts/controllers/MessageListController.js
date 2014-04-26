'use strict';

chatterBox.controller('MessageListController', ['$scope', 'socket', function($scope, socket) {
    $scope.messages = [];

    // Fetch message history of this chamber
    socket.emit('chamber:messages', {chamber: $scope.chamber}, function(messages) {
        console.log(messages);

        messages = messages.map(function(m) {
            var author;

            // Seach for the author object
            $scope.chamber.participants.forEach(function(p) {
                if (p.id === m.author) {
                    author = p;
                }
            });

            return {
                user: author,
                content: m.content,
                time: new Date(m.time)
            };
        });

        $scope.messages = $scope.messages.concat(messages);
    });

    // React on a new message
    socket.on('message:send', function(data) {
        console.log('Message recieved: ', data);

        // Not a message for this chamber, ignore it
        if ($scope.chamber.id !== data.chamber) {
            return;
        }

        $scope.messages.push(data);
    });
}]);
