app.controller('uielements', ['$scope', '$resource', '$modal', function($scope, $resource, $modal){
	$scope.predicate = 'name';
	var Type = $resource('/api/uielements/:id', {id: '@id'}, {
		update: {
	      method: 'PUT', // this method issues a PUT request
	      url: '/api/elements/:id'
	    }
	});

	//Get all possible child types
	/*var childrenPossible = {};
	var patterns = $resource('/api/standards/');
	patterns.query(function (results) {
		childrenPossible = results;
	});*/
	
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
			templateUrl: '/views/templates/componentsModal.html',
			controller: 'componentsModal',
			resolve: {
				item: function () {
					return editItem;
				}/*,
				childrenPossible: function () {
					return childrenPossible;
				}*/
			}
		});

		modalInstance.result.then(function (editItem) {
			var type = new Type();
			type.name = editItem.name;
			type.description = editItem.description;
			//type.children = editItem.children;
			type.$update({'id': editItem._id}, function (result) {
				Type.query(function (results) {
					$scope.types = results;
				});
			});
	    });

	}

	$scope.deleteItem = function () {
		var item = this.type;
		var modalInstance = $modal.open({
			templateUrl: '/views/templates/deleteDialogModal.html',
			controller: 'deleteDialogModal',
			resolve: {
				item: function () {
					return item;
				}
			}
		});

		modalInstance.result.then(function (item) {
			var type = new Type();
			type.$delete({'id': item._id}, function (result) {
				Type.query(function (results) {
					$scope.types = results;
				});
			});
	    });
	}
}]);

//app.controller('componentsModal', function ($scope, $modalInstance, item, childrenPossible) {
app.controller('componentsModal', function ($scope, $modalInstance, item) {
	$scope.predicate = 'name';
	//$scope.childrenPossible = childrenPossible;

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

	/*$scope.setClickstyle = function ($event) {
		($event.target.checked ? angular.element($event.target).parent().parent().addClass('checked') : angular.element($event.target).parent().parent().removeClass('checked'));
	}

	var getChecked = function () {
		var allChildren = [];
		angular.forEach(document.getElementsByClassName('childCheckbox'), function (val, key, obj) {
			if (val.checked) { allChildren.push({'id':val.id}) }
		}, $scope);
		return allChildren;
	}*/

	$scope.saveEdit = function () {
		item.name = $scope.editTypeName;
		item.description = $scope.editTypeDescription;
		//item.children = getChecked();
		$modalInstance.close(item);
	}

});

app.controller('deleteDialogModal', function ($scope, $modalInstance, item) {
	console.log(item);
	$scope.closeModal = function () {
		$modalInstance.dismiss();
	};

	$scope.doDelete = function () {
		$modalInstance.close(item);
	}

});