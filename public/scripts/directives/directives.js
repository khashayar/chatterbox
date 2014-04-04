'use strict';

chatterBox.directive('cboxAuth', function() {
    return {
        restrict: 'E',
        replace: true,
        template: '<span class="fa fa-2x" ng-click="auth()"></span>',
        link: function(scope, element, attrs) {
            if(attrs.data === 'google') {
                element.addClass('googleAuth fa-google-plus-square');
            }else{
                element.addClass('facebookAuth fa-facebook-square');
            }
            scope.auth = function() {
                window.location='http://localhost:3000/auth/google'
            }
        }
    } 
})
