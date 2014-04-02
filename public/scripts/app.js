'use strict';

/*jshint -W079 */
var chatterBox = angular.module('chatterBox', [
    'ngRoute',
    'btford.socket-io'
]);

chatterBox.factory('socket', function (socketFactory) {
    return socketFactory();
})
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: 'templates/container.html'
    }).when('/profile', {
        templateUrl: 'templates/messages.html'
    }).otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);
}]);
