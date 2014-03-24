'use strict';

appTagger.factory('FolderData', ['$http', '$q', function($http, $q) {
	return {
		getList: function(callback) {
			var defer = $q.defer();

			$http({method: 'GET', url: '/folder/'})
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