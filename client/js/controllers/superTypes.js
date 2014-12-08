app.controller('superTypes', ['$scope', '$resource', '$modal', function($scope, $resource, $modal){
	$scope.predicate = 'name';

	var Type = $resource('/api/supertypes/:id', {id: '@id'}, {
		update: {
	      method: 'PUT' // this method issues a PUT request
	    }
	});

	//Get all possible child types
	var childrenPossible = {};
	var layoutTypes = $resource('/api/types/');
	layoutTypes.query(function (results) {
		childrenPossible = results;
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
		var editItem = this.type;
		var modalInstance = $modal.open({
			templateUrl: '/views/templates/superTypesModal.html',
			controller: 'superTypeModal',
			resolve: {
				item: function () {
					return editItem;
				},
				childrenPossible: function () {
					return childrenPossible;
				}
			}
		});

		modalInstance.result.then(function (editItem) {
			var type = new Type();
			type.name = editItem.name;
			type.description = editItem.description;
			type.children = editItem.children;
			type.$update({'id': editItem._id}, function (result) {
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

app.controller('superTypeModal', function ($scope, $modalInstance, item, childrenPossible) {
	$scope.predicate = 'name';
	$scope.childrenPossible = childrenPossible;

	$scope.checkIfChild = function (id) {
		for (var i = item.children.length - 1; i >= 0; i--) {
			if (item.children[i].id === id) {
				return true
			}
		};
	}

	$scope.editTypeName = item.name;
	if (!item.description) {
		$scope.editTypeDescription = '';
	}
	else {
		$scope.editTypeDescription = item.description;	
	}
	$scope.closeModal = function () {
		$modalInstance.dismiss();
	};

	$scope.setClickstyle = function ($event) {
		($event.target.checked ? angular.element($event.target).parent().parent().addClass('checked') : angular.element($event.target).parent().parent().removeClass('checked'));
	}

	var getChecked = function () {
		var allChildren = [];
		angular.forEach(document.getElementsByClassName('childCheckbox'), function (val, key, obj) {
			if (val.checked) { allChildren.push({'id':val.id}) }
		}, $scope);
		return allChildren;
	}

	$scope.saveEdit = function () {
		item.name = $scope.editTypeName;
		item.description = $scope.editTypeDescription;
		item.children = getChecked();
		$modalInstance.close(item);
	}

});
