'use strict';

appTagger.controller('FolderController', ['$scope', 'FolderData', function($scope, folderData) {
	$scope.list = folderData.getList();
	console.log($scope.list);
}]);