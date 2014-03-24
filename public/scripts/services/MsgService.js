'use strict';

chatterBox.factory('Messages', ['$http', '$q', function($http, $q) {
	return {
        getList: function() {
            var defer = $q.defer();
            $http({method: 'GET', url: '/test'})
                .success(function(data, status, headers, config) {
                    defer.resolve(data);
                })
                .error(function(data, status, headers, config) {
                    defer.reject(status);
                })
            return defer.promise;
        }
	}
}]);


