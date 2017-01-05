(function () {
    'use strict';

    angular
        .module('signup')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['$scope'];

    function SignupController($scope) {
        // Attach functions to the controller here.
		var vm = this;
		vm.loadData = _loadData;
		vm.editData = _editData;
		vm.deleteData = _deleteData;
		vm.createData = _createData;
		vm.saveData = _saveData;
		
		// Any logic that needs to run when the controller loads should be placed here.
		vm.loadData();

		// Define functions here.
		function _loadData(id){
			$scope.getData = dataService.getData();
			$scope.getData.then(
					function(data){
						$scope.data = data;
					},
					function(data, status){
					}
			);
		};

		function _editData(id) {
			dataService.getData(id);
			$location.path('/productdetail/' + id);
		};

		function _deleteData(id, name) {
			dataService.deleteData(id, name);
			$scope.Data = dataService.getData();
			$route.reload();
			$location.path('/products');
		};

		function _createData() {
			$route.reload();
			$location.path('/productcreate');
		};

		function _saveData() {
			$scope.data = {};
			$scope.data.name = $scope.name;
			$scope.data.description = $scope.description;
			dataService.createData($scope.data);
			$location.path('/products');
			$route.reload();
		};

    }
})();