(function () {
    'use strict';

    angular
        .module('home')
        .controller('HomeController', HomeController);

    // HomeController.$inject = [];

    function HomeController() {
        // Attach functions to the controller here.
		var vm = this;
        
		// Any logic that needs to run when the controller loads should be placed here.
        vm.sorts = [
          "Last Created",
          "First Created",
          "Last Modified",
          "Name"
      ];
        
		// Define functions here.
		
    }
})();