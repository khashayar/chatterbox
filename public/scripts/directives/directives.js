'use strict';

chatterBox.directive('cboxAuth', function() {
    return {
        restrict: 'E',
        replace: true,
        template: '<div class="fa fa-2x" ng-click="auth($event.target)">Connect</div>',
        link: function(scope, element, attrs) {
            if (attrs.data === 'google') {
                element.addClass('googleAuth fa-google-plus');
            } else {
                element.addClass('facebookAuth fa-facebook');
            }
            scope.auth = function(data) {
                if (data.attributes.data.value === 'google') {
                    window.location='http://localhost:3000/auth/google';
                    return;
                }
                window.location='http://localhost:3000/auth/facebook';
            };
        }
    };
});
