app.controller('patterns', ['$scope', '$resource', '$modal', function($scope, $resource, $modal){
	var Type = $resource('/api/patterns/:id', {id: '@id'}, {
		update: {
	      method: 'PUT'
	    }
	});
	
	Type.query(function (results) {
		$scope.types = results;
	});
	
	$scope.addType = function () {
		var type = new Type();
		type.name = $scope.newType;
		type.$save(function (result) {
			$scope.types.push(result);
			$scope.newType = '';
		});
	}

	$scope.inEdit = function () {
		var editItem = {};
		editItem.name = this.type.name;
		editItem.description = this.type.description;
		editItem.id = this.type._id;
		var modalInstance = $modal.open({
			templateUrl: 'myModalContent.html',
			controller: 'patternsModal',

			resolve: {
				item: function () {
					return editItem;
				}
			}
		});

		modalInstance.result.then(function (editItem) {
			var type = new Type();
			type.name = editItem.name;
			type.description = editItem.description;
			type.$update({'id': editItem.id}, function (result) {
				Type.query(function (results) {
					$scope.types = results;
				});
			});
	    });

	}

	
	$scope.updateType = function () {
		var type = new Type();
		type.name = $scope.editTypeName;
		type.description = $scope.editTypeDescription;
		type.$update({'id': $scope.editingFieldId}, function (result) {
			Type.query(function (results) {
				$scope.types = results;
			});
		});
	}

	$scope.deleteItem = function () {
		var type = new Type();
		type.$delete({'id': this.type._id}, function (result) {
			Type.query(function (results) {
				$scope.types = results;
			});
		});
	}
}]);

app.controller('patternsModal', function ($scope, $modalInstance, item) {

	$scope.editTypeName = item.name;
	if (!item.description) {
		$scope.editTypeDescription = '';
	}
	$scope.closeModal = function () {
		$modalInstance.dismiss();
	};

	$scope.saveEdit = function () {
		var editItem = {};
		editItem.name = $scope.editTypeName;
		editItem.description = $scope.editTypeDescription;
		editItem.id = item.id;
		$modalInstance.close(editItem);
	}

});
