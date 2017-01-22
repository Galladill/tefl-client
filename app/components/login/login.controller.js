(function () {
    'use strict';

    angular
        .module('login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', 'authService', 'userService'];

    function LoginController($scope, authService, userService) {
        // Attach functions to the controller here.
		var vm = this;
		vm.login = _login;
		vm.signup = _signup;
		
		// Any logic that needs to run when the controller loads should be placed here.

		// Define functions here.
		function _login(){
			delete vm.user.confirmPassword;
			delete vm.user.firstName;
			delete vm.user.lastName;

			authService.login(vm.user.email, vm.user.password).then(function(res) {
				console.log('you are logged in as user', res);
			});
		};

		function _signup(){
			if (vm.user.confirmPassword === vm.user.password) {
				delete vm.user.confirmPassword;
				userService.createUser(vm.user).then(function(res) {
					console.log('you created user', res);
				});
			} else {
				console.log('passwords dont match');
			}
		};
    }
})();