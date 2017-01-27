(function () {
    'use strict';

    angular
        .module('home')
        .controller('HomeController', HomeController);

    HomeController.$inject = [''];

    function HomeController(authService, userService, $location, $mdToast) {
        // Attach functions to the controller here.
		var vm = this;
        /* Controller functions
		vm.login = _login;
		vm.signup = _signup;
		*/

		// Any logic that needs to run when the controller loads should be placed here.

		// Define functions here.
		
    }
})();