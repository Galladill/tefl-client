(function () {
    'use strict';

    angular
        .module('login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope'];

    function LoginController($scope) {
        // Attach functions to the controller here.
		var vm = this;
		// vm.loadData = _loadData;
		
		// Any logic that needs to run when the controller loads should be placed here.

		// vm.loadData();
		// vm.test = 'hey';

		// Define functions here.
		
		// function _loadData(id){
		// 	$scope.getData = dataService.getData();
		// 	$scope.getData.then(
		// 			function(data){
		// 				$scope.data = data;
		// 			},
		// 			function(data, status){
		// 			}
		// 	);
		// };


    }
})();