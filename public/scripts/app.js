'use strict';

var chatterBox = angular.module('chatterBox', [
    'ngRoute',
    'btford.socket-io'
]);

chatterBox.factory('socket', function (socketFactory) {
    return socketFactory();
});

chatterBox.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '../templates/container.html',
            controller: 'MsgController'
        });
    }
]);
